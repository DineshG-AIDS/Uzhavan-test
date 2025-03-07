import path from "path";
import express from "express";
import cors from "cors"; // Import CORS
import productsRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import updlodRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/erorrMiddleware.js";

const port = process.env.PORT || 5000;
connectDB();

const app = express();

// Enable CORS for all origins
app.use(cors({ origin: "*", credentials: true }));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello Jeevan");
});

app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", updlodRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send(
      "Uzavan API is running successfully. The Team: Learners ARAGANATHAN DINESH HARIHARAN JEEVANPRASATH"
    );
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`API is Running on port ${port}`);
});
