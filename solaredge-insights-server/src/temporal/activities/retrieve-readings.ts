import fetch from "node-fetch";

// import Reading, { IReading } from "../../models/reading.model";

export async function retrieveReadings(apikey: string): Promise<unknown> {
  try {

    const solaredgeBaseUrl = "https://monitoringapi.solaredge.com/site/1/powerDetails?";
    // "startTime=2015-11-21%2011:00:00&endTime=2015-11-21%2011:30:00&api_key=L4QLVQ1LOKCQX2193VSEICXW61NP6B1O"

    const endTime: Date = new Date();
    const endTimeISOString: string = endTime.toISOString();
    const endTimeParam: string = endTimeISOString.split('T')[0] + ' ' + endTimeISOString.split('T')[1].split('.')[0];


    const startTime: Date = new Date();
    const startMonth = startTime.getMonth();
    startTime.setMonth(startMonth - 1);
    const startTimeISOString: string = startTime.toISOString();
    const startTimeParam: string = startTimeISOString.split('T')[0] + ' ' + startTimeISOString.split('T')[1].split('.')[0];

    const apiKeyParam = apikey;
    console.log(apikey)
    console.log(apiKeyParam);

    const params = new URLSearchParams({
      startTime: startTimeParam,
      endTime: endTimeParam,
      api_key: apiKeyParam
    })

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
    }
    
    const result = (await response.json());
    return result;
  } catch (error) {
    // log in temporal
  }
}