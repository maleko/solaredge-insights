import fetch from "node-fetch";
import * as dotenv from 'dotenv';

dotenv.config();

// import Reading, { IReading } from "../../models/reading.model";

export async function retrieveReadings(extractionDate: Date): Promise<string> {
  try {
    const API_KEY: string = process.env.API_KEY!;
    const SITE_ID: string = process.env.SITE_ID!;
    const BASE_SOLAREDGE_URL: string = process.env.BASE_SOLAREDGE_URL!;

    const solaredgeBaseUrl = BASE_SOLAREDGE_URL + SITE_ID + "/powerDetails?";
    // "startTime=2015-11-21%2011:00:00&endTime=2015-11-21%2011:30:00&api_key=L4QLVQ1LOKCQX2193VSEICXW61NP6B1O"

    console.log("retrieveReadings activity started");

    // Specify a specific start and end time for the request for now
    const startTime: Date = new Date(extractionDate);
    const startTimeISOString: string = startTime.toISOString();
    const startTimeParam: string = startTimeISOString.split('T')[0] + ' ' + startTimeISOString.split('T')[1].split('.')[0];

    const endTime: Date = new Date(extractionDate);
    endTime.setDate(endTime.getDate() + 1)
    const endTimeISOString: string = endTime.toISOString();
    const endTimeParam: string = endTimeISOString.split('T')[0] + ' ' + endTimeISOString.split('T')[1].split('.')[0];

    const params = new URLSearchParams({
      startTime: startTimeParam,
      endTime: endTimeParam,
      api_key: API_KEY
    })

    console.log(solaredgeBaseUrl + params);

    // retrieve JSON from API server
    const response = await fetch(
      (solaredgeBaseUrl + params),
      {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      }
    );

    if(!response.ok) {
      // do something Temporal can handle. 
      console.log("Could not retrieve readings from SolarEdge API");
    }
    
    const result = (await response.json());
    return JSON.stringify(result);
  } catch (error) {
    // log in temporal
    return JSON.stringify(error);
  }
}