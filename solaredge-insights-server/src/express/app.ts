import express from 'express';
import { json } from 'body-parser';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(json());

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})