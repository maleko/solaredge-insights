import * as dotenv from 'dotenv';
import { getCost, getFeedInCosts } from '../../lib/retrieve-cost';
import SolarReading from '../../interfaces/solar-reading.interface';
import ProcessedReading from '../../interfaces/processed-reading.interface';

dotenv.config();

export async function calculateCostsFromReadings(retrievedReading: SolarReading): Promise<ProcessedReading | unknown> {
  try { 
    console.log("calculateCostsFromReadings activity started");
    
    const solarReadings = retrievedReading;

    let feedInCost: number = 0;
    let selfConsumptionCost: number = 0;
    
    const readingDate: Date = new Date(solarReadings.energyDetails.meters[0].values[0].date);

    console.log("Reading date:" + readingDate.toISOString());
    
    for (const meter of solarReadings.energyDetails.meters) {
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

    const processedReading: ProcessedReading = {
      date: readingDate,
      feedInCost,
      selfConsumptionCost,
      totalCostSavings: feedInCost + selfConsumptionCost
    };

    console.log(processedReading);

    return processedReading;
  } catch (error) {
    // log in temporal
    return error;
  }
}