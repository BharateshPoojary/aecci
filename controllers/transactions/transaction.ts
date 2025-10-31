import type { Request, Response } from "express";
import { transactionModel } from "../../schema/transaction.schema.ts";
import { MongooseError } from "mongoose";

export const getTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { type, category, startDate, endDate, sort = "-date" } = req.query;

    // Build query object
    const query: {
      type?: string;
      category?: string;
      date?: {
        $gte?: Date;
        $lte?: Date;
      };
    } = {};

    if (type) {
      query.type = (type as string).toLowerCase();
    }

    if (category) {
      query.category = (category as string).toLowerCase();
    }

    // Date range filter
    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate as string);
      }
      if (endDate) {
        query.date.$lte = new Date(endDate as string);
      }
    }

    // Execute query
    const transactions = await transactionModel
      .find(query)
      .sort(sort as string);

    const total = await transactionModel.countDocuments(query);

    res.status(200).json({
      success: true,
      count: transactions.length,
      total,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching transactions",
      error:
        error instanceof MongooseError ? error.message : "Failed to fetch ",
    });
  }
};

export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(req.body);
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

export const getTransactionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const transaction = await transactionModel.findById(req.params.id);

    if (!transaction) {
      res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching transaction",
      error:
        error instanceof MongooseError ? error.message : "Failed to fetch ",
    });
  }
};
export const updateTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("ReQUEST bOSY", req.body);
    const transaction = await transactionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!transaction) {
      res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating transaction",
      error:
        error instanceof MongooseError ? error.message : "Failed to fetch ",
    });
  }
};
export const deleteTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const transaction = await transactionModel.findByIdAndDelete(req.params.id);

    if (!transaction) {
      res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting transaction",
      error:
        error instanceof MongooseError ? error.message : "Failed to fetch ",
    });
  }
};
