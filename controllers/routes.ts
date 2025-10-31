import express from "express";
const expressRouter = express.Router();
import { transactionRouter } from "./transactions/_route.ts";
expressRouter.use("/transactions", transactionRouter);

export default expressRouter;
