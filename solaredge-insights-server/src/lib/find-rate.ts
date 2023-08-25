import { dbConnect } from "./dbConnect";
import ElectricRate from "../models/electric-rate.model";

async function run() {
  try {
    await dbConnect();

    const date = new Date("2021-10-10");

    console.log("date: ", date.toISOString());

    // await ElectricRate.
    //   findOne({ startDate: { $lte: date }, endDate: { $gte: date } }, 
    //     'retailer startDate endDate peakCostInCents shoulderCostInCents offPeakCostInCents feedInCostInCents').
    //   then((rates) => 
    //     { console.log("result: ", rates ? rates : "nothing" ) });

    const rate = await ElectricRate.
      findOne({ startDate: { $lte: date }, endDate: { $gte: date } }, 
        'retailer startDate endDate peakCostInDollars shoulderCostInDollars offPeakCostInDollars feedInCostInDollars');

    console.log("rate: ", rate);

    // await ElectricRate.
    //   findOne({ retailer: "Powershop" }, 
    //     'retailer startDate endDate peakCostInCents shoulderCostInCents offPeakCostInCents feedInCostInCents').
    //   then((rate) => 
    //     { console.log("result: ", rate ? rate : "nothing" ) });        

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