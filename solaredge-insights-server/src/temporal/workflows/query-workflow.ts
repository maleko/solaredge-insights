import { Client } from '@temporalio/client';
import { getCurrentResultsQuery } from './orchestrator-workflow';

async function run(): Promise<void> {
  const client = new Client();
  const handle = client.workflow.getHandle('workflow-orchestrator-' + '2019-08-19')
  const result = await handle.query(getCurrentResultsQuery);
  console.log(JSON.stringify(result));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});