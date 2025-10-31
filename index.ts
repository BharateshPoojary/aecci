import express from "express";
import cors from "cors";
import router from "./controllers/routes.ts";
import dbConnection from "./lib/dbConnect.ts";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
(async () => {
  await dbConnection();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
app.use("/api", router);
