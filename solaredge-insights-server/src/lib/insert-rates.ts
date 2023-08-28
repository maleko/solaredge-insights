import { dbConnect } from "./dbConnect";
import ElectricRate from "../models/electric-rate.model";

async function run() {
  try {
    await dbConnect();

    console.log(await ElectricRate.create({
      retailer: "Sumo Energy",
      startDate: "2022-07-20",
      endDate: "2023-07-31",
      peakCostInDollars: 0.3080,
      shoulderCostInDollars: 0.1650,
      offPeakCostInDollars: 0.1650,
      feedInCostInDollars: 0.1020
    }));    

    console.log(await ElectricRate.create({
      retailer: "OVO Energy",
      startDate: "2022-06-02",
      endDate: "2022-07-19",
      peakCostInDollars: 0.3204,
      shoulderCostInDollars: 0.3080,
      offPeakCostInDollars: 0.3080,
      feedInCostInDollars: 0.0621
    }));

    console.log(await ElectricRate.create({
      retailer: "ReAmped Energy",
      startDate: "2022-05-17",
      endDate: "2022-06-01",
      peakCostInDollars: 0.2618,
      shoulderCostInDollars: 0.1403,
      offPeakCostInDollars: 0.1403,
      feedInCostInDollars: 0.0670
    }));

    console.log(await ElectricRate.create({
      retailer: "ReAmped Energy",
      startDate: "2021-10-13",
      endDate: "2022-05-16",
      peakCostInDollars: 0.2618,
      shoulderCostInDollars: 0.1403,
      offPeakCostInDollars: 0.1403,
      feedInCostInDollars: 0.10000
    }));

    console.log(await ElectricRate.create({
      retailer: "Powershop",
      startDate: "2021-03-01",
      endDate: "2021-10-12",
      peakCostInDollars: 0.2981,
      shoulderCostInDollars: 0.2022,
      offPeakCostInDollars: 0.1709,
      feedInCostInDollars: 0.1020
    }));
    
    console.log(await ElectricRate.create({
      retailer: "Powershop",
      startDate: "2020-07-29",
      endDate: "2021-02-28",
      peakCostInDollars: 0.3619,
      shoulderCostInDollars: 0.2527,
      offPeakCostInDollars: 0.2171,
      feedInCostInDollars: 0.1020
    }));

    console.log(await ElectricRate.create({
      retailer: "Powershop",
      startDate: "2020-01-01",
      endDate: "2020-07-28",
      peakCostInDollars: 0.3619,
      shoulderCostInDollars: 0.2527,
      offPeakCostInDollars: 0.2171,
      feedInCostInDollars: 0.1200
    }));

    console.log(await ElectricRate.create({
      retailer: "Powershop",
      startDate: "2019-08-28",
      endDate: "2019-12-31",
      peakCostInDollars: 0.3905,
      shoulderCostInDollars: 0.2727,
      offPeakCostInDollars: 0.2342,
      feedInCostInDollars: 0.1200
    }));

    console.log(await ElectricRate.create({
      retailer: "Powershop",
      startDate: "2019-07-29",
      endDate: "2019-08-27",
      peakCostInDollars: 0.3039,
      shoulderCostInDollars: 0.3039,
      offPeakCostInDollars: 0.3039,
      feedInCostInDollars: 0.1200
    }));
  } catch (err: any) {
    console.log(err.stack);
  } 
}

// run().catch(console.dir);
run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
