// import express from "express";
import express from "express";
import productsRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/erorrMiddleware.js";

const port = process.env.PORT || 5000;
connectDB();

const app = express();

//BODY PARSER MIDDLEWARE
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

//Cookie parser pakage intialzer
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello jeevan");
});

app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Api is Running on ${port}`);
});
