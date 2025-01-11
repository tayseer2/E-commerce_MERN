import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import { seedInitialProducts } from "./services/productService";
import cors from "cors"


dotenv.config();
const app = express();
const PORT = 3001;

app.use(cors())


app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to Connect!", err));

// seed the products to the database
seedInitialProducts();

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
