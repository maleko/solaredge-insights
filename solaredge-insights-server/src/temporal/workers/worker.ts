import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflows/workflow.ts'),
    activities,
    taskQueue: 'solaredge-insights',
  });

  // Start accepting tasks on the `tutorial` queue
  await worker.run();
}