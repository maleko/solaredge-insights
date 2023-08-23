import { Connection, Client } from '@temporalio/client';
import * as Workflows from './workflows/workflow';

async function run() {
  // Connect to the default Server location (localhost:7233)
  const connection = await Connection.connect();
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new Client({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  const extractionDate: Date = new Date("2021-10-10");

  const handle = await client.workflow.start(Workflows.ProcessSolarReadings, {
    // type inference works! args: [name: string]
    args: [extractionDate],
    taskQueue: 'solaredge-insights',
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: 'workflow-solaredge-insights-' + extractionDate.toISOString().split('T')[0]
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result()); // Hello, Temporal!
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
