import dbConnection from "../../lib/dbConnect";

export const createTransaction = async (req:Request, res:Response) => {
  try {
    await dbConnection();
    const transaction = await Transaction.create(req.body);

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating transaction",
      error: error.message,
    });
  }
};

