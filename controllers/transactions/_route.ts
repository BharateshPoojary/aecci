import { Router } from "express";
import {
  getTransaction,
  createTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "./transaction.ts";
export const transactionRouter = Router();
transactionRouter.post("/createTransaction", createTransaction);
transactionRouter.get("/", getTransaction);
transactionRouter.get("/:id", getTransactionById);
transactionRouter.put("/:id", updateTransaction);
transactionRouter.delete("/:id",deleteTransaction)

