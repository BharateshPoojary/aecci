import express from "express"
const router = express.Router();
import {transactions} from "../controllers/routes"
router.use("/transactions", transactions);

module.exports = router;
