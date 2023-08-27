import { Connection, Client } from '@temporalio/client';
import * as Workflows from './workflows';

async function run() {
  // Connect to the default Server location (localhost:7233)
  const connection = await Connection.connect();


  const client = new Client({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  const startDate: Date = new Date("2021-10-01");
  const endDate: Date = new Date("2021-10-31");
  const handle = await client.workflow.start(Workflows.orchestratorWorkflow, {
    // type inference works! args: [name: string]
    args: [startDate, endDate],
    taskQueue: 'solaredge-insights',
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: 'workflow-orchestrator-' + startDate.toISOString().split('T')[0]
  });
  console.log(`Started workflow ${handle.workflowId}`);
  const result = await handle.result();

  console.log("Result: " + result);

  // optional: wait for client result
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
