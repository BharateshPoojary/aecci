import { Router } from "express";
import {createTransaction}  from "./transaction.ts";
export const transactionRouter = Router()
// transactionRouter.get("/getAll", transaction.getTransaction);
transactionRouter.post("/createTransaction", createTransaction);
// transactionRouter.put("/updateTransaction", transaction.updateTransaction);
// transactionRouter.delete("/deleteTransaction", transaction.deleteTransaction);


