import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IReading {
  readingType: string;
  timeStamp: Date;
  value: number;
}

const readingSchema = new Schema<IReading>({
    readingType: { type: String, required: true },
    timeStamp: { type: Date, required: true },
    value: { type: Number }
  },
  {
    timeseries: {
      timeField: 'timeStamp',
      metaField: 'readingType',
      granularity: 'minutes'
    }
});

export default model<IReading>('Reading', readingSchema);