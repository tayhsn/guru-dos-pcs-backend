import express from "express";
import cors from "cors";
import router from "./routes/router.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(port, () => console.log("Server is running on: " + port));
