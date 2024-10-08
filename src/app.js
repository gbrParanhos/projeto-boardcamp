import 'dotenv/config';
import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import gamesRouter from './routers/gamesRouter.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';
import customersRouter from './routers/customersRouter.js';
import rentalsRouter from './routers/rentalsRouter.js';

const app = express();
app.use(cors());
app.use(json());

app.use(gamesRouter);
app.use(customersRouter);
app.use(rentalsRouter);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running in port ${port}`);
})