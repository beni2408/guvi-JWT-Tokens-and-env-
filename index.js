import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./src/routes/authRoutes.js";
import infoRouter from "./src/routes/infoToutes.js";

import errorHandler from "./src/middlewares/errorhandler.js";
import connectDB from "./src/config/db.js";

const app = express();
console.log(process.env.PORT);
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Application is working well");
});

app.use("/api/auth", authRouter);
app.use("/api/info", infoRouter);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});
