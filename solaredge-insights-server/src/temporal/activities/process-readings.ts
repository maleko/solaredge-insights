import * as dotenv from 'dotenv';
import { getCost, getFeedInCosts } from '../../lib/retrieve-cost';

dotenv.config();

interface SolarReading {
  totalCost: number;
  feedInCost: number;
  selfConsumptionCost: number;
  energyDetails: {
    meters: {
      type: string;
      values: {
        date: string;
        value: number;
      }[];
    }[];
  };
}

export async function processReadings(solarReadings: string): Promise<string> {
  try { 
    console.log("processReadings activity started");
    
    const processedReadings = JSON.parse(solarReadings) as SolarReading;

    let feedInCost: number = 0;
    let selfConsumptionCost: number = 0;

    const readingDate: Date = new Date(processedReadings.energyDetails.meters[0].values[0].date);

    console.log("Reading date:" + readingDate.toISOString());
    
    for (const meter of processedReadings.energyDetails.meters) {
    // processedReadings.powerDetails.meters.forEach(meter => {
      if (meter.type == "FeedIn") {
        console.log("FeedIn meter found");

        const feedInSubCosts = await Promise.all(meter.values.map(value => getFeedInCosts(new Date(value.date))));
        console.log ("FeedIn sub costs: " + feedInSubCosts);
        feedInCost += feedInSubCosts.reduce((total, cost, index) => total + (cost * (meter.values[index].value) / 1000), 0);
      }


      if (meter.type == "SelfConsumption") {
        console.log("Self Consumption meter found");

        const selfConsumptionSubCost = await Promise.all(meter.values.map(value => getCost(new Date(value.date))));
        console.log ("Self consumption sub costs: " + selfConsumptionSubCost);
        selfConsumptionCost += selfConsumptionSubCost.reduce((total, cost, index) => total + (cost * (meter.values[index].value) / 1000), 0);

      }
    };

    console.log("FeedIn cost: " + feedInCost);
    console.log("Self consumption cost: " + selfConsumptionCost);

    processedReadings.feedInCost = feedInCost;
    processedReadings.selfConsumptionCost = selfConsumptionCost;
    processedReadings.totalCost = feedInCost + selfConsumptionCost;

    console.log(processedReadings);

    return JSON.stringify(processedReadings);
  } catch (error) {
    // log in temporal
    return JSON.stringify(error);
  }
}