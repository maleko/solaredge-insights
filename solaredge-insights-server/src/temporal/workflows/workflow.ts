/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as wf from '@temporalio/workflow';

// Only import the activity types
import type * as activities from '../activities/retrieve-readings';
import dbConnect from '../../lib/dbConnect';

const { retrieveReadings } = wf.proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function ProcessSolarReadings(): Promise<unknown> {
  return await retrieveReadings();
}
