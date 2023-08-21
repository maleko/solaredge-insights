import { Worker } from '@temporalio/worker';
import * as activities from '../activities/retrieve-readings';

run().catch((err) => console.log(err));

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'solaredge-insights',
  });

  // Start accepting tasks on the `tutorial` queue
  await worker.run();
}