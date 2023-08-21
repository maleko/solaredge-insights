import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IReading {
  readingType: string;
  date: Date;
  value: number;
}

const readingSchema = new Schema<IReading>({
  readingType: { type: String, required: true },
  date: { type: Date, required: true },
  value: { type: Number }
});

export default model<IReading>('Reading', readingSchema);