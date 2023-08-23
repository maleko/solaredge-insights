import fetch from "node-fetch";
import * as dotenv from 'dotenv';
import dbConnect from "../../lib/dbConnect";

dotenv.config();

// import Reading, { IReading } from "../../models/reading.model";

interface SolarReading {
  powerDetails: {
    meters: {
      type: string;
      totalCost: number;
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

    const readingDate: Date = new Date(processedReadings.powerDetails.meters[0].values[0].date);

    console.log("Reading date:" + readingDate.toISOString);

    console.log(solarReadings);

    processedReadings.powerDetails.meters[0].totalCost = 123;

    console.log(processedReadings);

    return JSON.stringify(processedReadings);
  } catch (error) {
    // log in temporal
    return JSON.stringify(error);
  }
}