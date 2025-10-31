import type { Request, Response } from "express";
import { transactionModel } from "../../schema/transaction.schema.ts";

export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const transaction = await transactionModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error creating transaction",
      error: error.message,
    });
  }
};
