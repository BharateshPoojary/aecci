import mongoose from "mongoose";

type connectionResObj = {
  isConnected?: mongoose.ConnectionStates | undefined;
};
const Connection: connectionResObj = {};
const dbConnection = async (): Promise<void> => {
  if (Connection.isConnected) {
    return;
  }
  console.log("hi")
  try {
    const dbConnect = await mongoose.connect(process.env.MONGODB_URI || "", {});
    Connection.isConnected = dbConnect.connections[0]?.readyState;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
export default dbConnection;
