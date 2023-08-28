import * as wf from '@temporalio/workflow';
import { processSolarReadings } from '.';
import ProcessedReading from '../../interfaces/processed-reading.interface';
import TotalCosts from '../../interfaces/total-costs.interface';

// const { retrieveReadings, calculateCostsFromReadings } = wf.proxyActivities<typeof activities>({
//   startToCloseTimeout: '1 minute',
// });

export const getCurrentResultsQuery = wf.defineQuery<TotalCosts>('getCurrentResults');

export async function orchestratorWorkflow(startDate: Date, endDate: Date): Promise<TotalCosts> {

  // create an array of dates to process
  const dateArray: Array<Date> = getDateArray(startDate, endDate);
  const result: TotalCosts = {
    startDate,
    endDate,
    feedInCost: 0,
    selfConsumptionCost: 0,
    totalCostSavings: 0
  };

  for (const extractionDate of dateArray) {
    console.log("Processing date: " + extractionDate.toISOString());

    const processedReadings: ProcessedReading = await wf.executeChild(processSolarReadings, {
      args: [extractionDate],
      taskQueue: 'solaredge-insights',
      workflowId: 'workflow-solaredge-insights-' + extractionDate.toISOString().split('T')[0]
    });

    result.feedInCost += processedReadings.feedInCost;
    result.selfConsumptionCost += processedReadings.selfConsumptionCost;
    result.totalCostSavings += processedReadings.totalCostSavings;
 
    wf.setHandler(getCurrentResultsQuery, () => result);
  }
  return result;
}

function getDateArray(startDate: Date, endDate: Date) {
  const arr = [];

  console.log(startDate);

  for (let dt: Date = new Date(startDate); dt <= new Date(endDate); dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
}