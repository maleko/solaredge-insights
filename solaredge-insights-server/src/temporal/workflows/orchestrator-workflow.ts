import * as wf from '@temporalio/workflow';
import * as activities from '../activities';
import { listenerCount } from 'process';
import { processSolarReadings } from '.';

interface TotalCosts {
  startDate: Date;
  endDate: Date;
  feedInCost: number;
  selfConsumptionCost: number;
  totalCostSavings: number;
}

interface ProcessedReadings {
  date: Date;
  feedInCost: number;
  selfConsumptionCost: number;
  totalCostSavings: number;
}

// const { retrieveReadings, calculateCostsFromReadings } = wf.proxyActivities<typeof activities>({
//   startToCloseTimeout: '1 minute',
// });

export async function orchestratorWorkflow(startDate: Date, endDate: Date): Promise<string> {

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

    const processedReadings = JSON.parse(await wf.executeChild(processSolarReadings, {
      args: [extractionDate],
      taskQueue: 'solaredge-insights',
      workflowId: 'workflow-solaredge-insights-' + extractionDate.toISOString().split('T')[0]
    }));

    result.feedInCost += processedReadings.feedInCost;
    result.selfConsumptionCost += processedReadings.selfConsumptionCost;
    result.totalCostSavings += processedReadings.totalCostSavings;
  }

  return JSON.stringify(result);
}

function getDateArray(startDate: Date, endDate: Date) {
  const arr = [];

  console.log(startDate);

  for (let dt: Date = new Date(startDate); dt <= new Date(endDate); dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
}