/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as wf from '@temporalio/workflow';
import ProcessedReading from '../../interfaces/processed-reading.interface';
import SolarReading from '../../interfaces/solar-reading.interface';

// Only import the activity types
import type * as activities from '../activities';

const interval = 60 * 60 * 24; // 1 day

const { retrieveReadings, calculateCostsFromReadings } = wf.proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
  retry: {
    // default retry policy if not specified
    initialInterval: interval.toString() + 's',
    backoffCoefficient: 10,
    maximumAttempts: Infinity,
    maximumInterval: (10 * interval).toString() + 's',
    nonRetryableErrorTypes: [],
  },
});

/** A workflow that simply calls an activity */
export async function processSolarReadings(extractionDate: Date): Promise<ProcessedReading> {
  console.log("ProcessSolarReadings workflow started");
  console.log(extractionDate);
  const retrievedSolarReadings = await retrieveReadings(extractionDate);

  return await calculateCostsFromReadings(retrievedSolarReadings as SolarReading) as ProcessedReading;
}
