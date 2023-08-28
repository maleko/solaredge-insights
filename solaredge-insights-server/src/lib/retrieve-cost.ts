import { dbConnect } from './dbConnect';
import ElectricRate from '../models/electric-rate.model';

export async function getCost(date: Date): Promise<number> {

  await dbConnect();

  const peakTime: Array<number> = [15, 16, 17, 18, 19, 20, 21];
  const offPeakTime: Array<number> = [23, 0, 1, 2, 3, 4, 5, 6, 7];
  const shoulderTime: Array<number> = [7, 8, 9, 10, 11, 12, 13, 14, 15, 21, 22];

  const rate = await ElectricRate.
    findOne({ startDate: { $lte: date }, endDate: { $gte: date } },
      'retailer startDate endDate peakCostInDollars shoulderCostInDollars offPeakCostInDollars feedInCostInDollars');

  const peakCostinDollarsPerkWh: number = rate ? rate.peakCostInDollars : 0;
  const offPeakCostinDollarsPerkWh: number = rate ? rate.offPeakCostInDollars : 0;
  const shoulderCostinDollarsPerkWh: number = rate ? rate.shoulderCostInDollars : 0;

  const hour = date.getHours();
  // const minute = date.getMinutes();

  if (peakTime.includes(hour)) {
    // Commenting this out as we aren't retrieving quarterly readings
    // if ((minute == 0) && (hour == 15)) { 
    //   return shoulderCostinDollarsPerkWh;
    // } 
    return peakCostinDollarsPerkWh;
  } else if (offPeakTime.includes(hour)) {
    // if ((minute == 0) && (hour == 23)) { 
    //   return shoulderCostinDollarsPerkWh;
    // }
    return offPeakCostinDollarsPerkWh;
  } else if (shoulderTime.includes(hour)) {
    // if ((minute == 0) && (hour == 7)) { 
    //   return offPeakCostinDollarsPerkWh;
    // }
    // if ((minute == 0) && (hour == 21)) {
    //   return peakCostinDollarsPerkWh;
    // }
    return shoulderCostinDollarsPerkWh;
  }

  return peakCostinDollarsPerkWh;
}

export async function getFeedInCosts(date: Date): Promise<number> {

  await dbConnect();

  const rate = await ElectricRate.
    findOne({ startDate: { $lte: date }, endDate: { $gte: date } },
      'retailer startDate endDate peakCostInDollars shoulderCostInDollars offPeakCostInDollars feedInCostInDollars');
      
  const feedInCostinDollarsPerkWh: number = rate ? rate.feedInCostInDollars : 0;

  return feedInCostinDollarsPerkWh;
}