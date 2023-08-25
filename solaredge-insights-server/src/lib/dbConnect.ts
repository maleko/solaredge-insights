import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) throw new Error('MONGO_URI is not defined.');

declare global {
  // eslint-disable-next-line no-var
  var mongoose: any; // This must be a `var` and not a `let / const`
}

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null };


export const dbConnect = async () => {

  if (cached.conn) return cached.conn;

  cached.conn = await mongoose.connect(MONGODB_URI);
  
  console.log("Connected to MongoDB");

  return cached.conn;
};