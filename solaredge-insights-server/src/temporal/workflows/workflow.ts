/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as wf from '@temporalio/workflow';

// Only import the activity types
import type * as activities from '../activities';

const { retrieveReadings, processReadings } = wf.proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function ProcessSolarReadings(extractionDate: Date): Promise<string> {
  console.log("ProcessSolarReadings workflow started");
  console.log(extractionDate);
  const solarReadings = await retrieveReadings(extractionDate);

  return await processReadings(solarReadings);

}
