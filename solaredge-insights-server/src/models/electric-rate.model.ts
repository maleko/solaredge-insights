import { Schema, model } from 'mongoose';
import { IElectricRate, IElectricRateDocument, IElectricRateModel } from '../interfaces/electric-rate.interface';

const ElectricRateSchema: Schema<IElectricRateDocument> = new Schema({
  retailer: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type : Date, required: true },
  peakCostInDollars: { type: Number },
  shoulderCostInDollars: { type: Number },
  offPeakCostInDollars: { type: Number },
  feedInCostInDollars: { type: Number }
});

ElectricRateSchema.statics.buildElectriRate = (args: IElectricRate) => {
  return new ElectricRate(args);
};

const ElectricRate = model<IElectricRateDocument, IElectricRateModel>('electricRates', ElectricRateSchema);

export default ElectricRate;
