/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as wf from '@temporalio/workflow';

// Only import the activity types
import type * as activities from '../activities';

const initialInterval = 60 * 60 * 24; // 1 day

const { retrieveReadings, calculateCostsFromReadings } = wf.proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
  retry: {
    // default retry policy if not specified
    initialInterval: initialInterval.toString() + 's',
    backoffCoefficient: 10,
    maximumAttempts: Infinity,
    maximumInterval: 10 * initialInterval,
    nonRetryableErrorTypes: [],
  },
});

/** A workflow that simply calls an activity */
export async function ProcessSolarReadings(extractionDate: Date): Promise<string> {
  console.log("ProcessSolarReadings workflow started");
  console.log(extractionDate);
  const solarReadings = await retrieveReadings(extractionDate);

  return await calculateCostsFromReadings(solarReadings);

}
