import * as wf from '@temporalio/workflow';
import { getDateArray } from '../../lib/utilities';
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
  // Get an array of months to store the monthly costs
  // Get an array of years to store the yearly costs
  // Get an array of days to store the daily costs

  // This kind of presets the costs and it's hard to maintain. Best to recalculate each time.
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