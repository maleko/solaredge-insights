# SolarEdge Insights

Just a fun analysis of how much you have saved from installing a SolarEdge PV system. 

# What you need

- API Key - Provision it in https://monitoring.solaredge.com
- Site ID - Retrieve it from the above url
- Electric Rates - Get it from your bill

# Setup

- Install MongoDB
- Add the API Key and Site ID to the `.env` file. An example file (`.env.example`) is checked in. 
- Add your rates to `solaredge-insights-server/src/lib/insert-rates.ts`
  - You may need to modify the rate schedule (peak, off-peak, shoulder) in `solaredge-insights-server/src/lib/retrieve-costs`
  - Additionally it doesn't handle anything with blocks 
- Import your rates into MongoDB
- Set the retrieval start and end dates in `solaredge-insights-server/src/temporal/client.ts`

## Importing rates

Run this:

```bash
ts-node src/lib/insert-rates.ts
```


# Execution

1. `temporal server start-dev` to start [Temporal Server](https://github.com/temporalio/cli/#installation)
   1. Use `temporal server start-dev -db-filename filename` if you want to persist it
2. `npm install` to install dependencies
3. `npm run start.watch` to start the Worker
4. In another shell, `npm run workflow` to run the Workflow Client

The Workflow should return something like this:

```bash

> solaredge-insights-server@1.0.0 workflow
> ts-node src/temporal/client.ts

Started workflow workflow-orchestrator-2019-08-19
Result: {"startDate":"2019-08-19T00:00:00.000Z","endDate":"2019-12-31T00:00:00.000Z","feedInCost":170.63244,"selfConsumptionCost":481.7893331,"totalCostSavings":652.4217730999995}

```

# Querying Run State

In another shell, `npm run query` to run the Workflow Client.


# Caveats
- For now, you need to navigate to http://localhost:8233/namespaces/default/workflows to view the results
- I need to add tests..... I know there's something weird about the date array.... 
- Solaredge states you got a maximum of 300 API calls daily
- Need to retrieve a list of running workflows in Temporal Server to determine which one we want to run the query on

# Things to improve

- Use a workflow to import the electricity rates and use queries to retrieve it
  - Remove MongoDB
- Allow some customisation into how the peak, off-peak and shoulder rate hours are documented. Currently it is hardcoded to Victorian (Australia) schedules
- Add a UI so it's prettier to convince your better half
  
