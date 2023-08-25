import { Model, Document, Date } from 'mongoose';

export interface IElectricRate {
  retailer: string;
  startDate: Date;
  endDate: Date;
  peakCostInDollars: number;
  shoulderCostInDollars: number;
  offPeakCostInDollars: number;
  feedInCostInDollars: number;
}

export interface IElectricRateDocument extends IElectricRate, Document {}

export interface IElectricRateModel extends Model<IElectricRateDocument> {
  buildElectriRate(args: IElectricRate): IElectricRateDocument;
}