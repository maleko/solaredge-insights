import fetch from "node-fetch";
import * as dotenv from 'dotenv';
import dbConnect from "../../lib/dbConnect";

dotenv.config();

// import Reading, { IReading } from "../../models/reading.model";

interface SolarReading {
  totalCost: number;
  feedInCost: number;
  selfConsumptionCost: number;
  powerDetails: {
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
    await dbConnect();

    console.log("processReadings activity started");
    
    const processedReadings = JSON.parse(solarReadings) as SolarReading;

    let feedInCost: number = 0;
    let selfConsumptionCost: number = 0;

    const readingDate: Date = new Date(processedReadings.powerDetails.meters[0].values[0].date);

    console.log("Reading date:" + readingDate.toISOString());
    
    processedReadings.powerDetails.meters.forEach(meter => {
      if (meter.type == "FeedIn") {
        console.log("FeedIn meter found");
        meter.values.forEach(value => {
          feedInCost += (value.value / 1000) * getCost(new Date(value.date));
        });
      }

      if (meter.type == "SelfConsumption") {
        console.log("Self Consumption meter found");
        meter.values.forEach(value => {
          selfConsumptionCost += (value.value / 1000) * getCost(new Date(value.date));
        });
      }
    });

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

function getCost(date: Date): number {

  const peakTime: Array<number> = [15, 16, 17, 18, 19, 20, 21];
  const offPeakTime: Array<number> = [23, 0, 1, 2, 3, 4, 5, 6, 7];
  const shoulderTime: Array<number> = [7, 8, 9, 10, 11, 12, 13, 14, 15, 21, 22];

  const peakCostinCentsPerkWh: number = 29.81;
  const offPeakCostinCentsPerkWh: number = 17.09;
  const shoulderCostinCentsPerkWh: number = 20.22;

  const hour = date.getHours();
  const minute = date.getMinutes();

  if (peakTime.includes(hour)) {
    if ((minute == 0) && (hour == 15)) { 
      return shoulderCostinCentsPerkWh;
    } 
    return peakCostinCentsPerkWh;
  } else if (offPeakTime.includes(hour)) {
    if ((minute == 0) && (hour == 23)) { 
      return shoulderCostinCentsPerkWh;
    }
    return offPeakCostinCentsPerkWh;
  } else if (shoulderTime.includes(hour)) {
    if ((minute == 0) && (hour == 7)) { 
      return offPeakCostinCentsPerkWh;
    }
    if ((minute == 0) && (hour == 21)) {
      return peakCostinCentsPerkWh;
    }
    return shoulderCostinCentsPerkWh;
  }

  return peakCostinCentsPerkWh;
}