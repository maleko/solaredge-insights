/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as wf from '@temporalio/workflow';

// Only import the activity types
import type * as activities from '../activities/retrieve-readings';

const { retrieveReadings } = wf.proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function ProcessSolarReadings(){
  return await retrieveReadings("5SOSVGG2YPECZHCBIYR9DASERVY57Q60");
}
