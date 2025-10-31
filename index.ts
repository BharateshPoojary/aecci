import  express  from "express";
import cors from "cors"
const router = require("./controllers/routes");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
