import { getAllProducts } from "./../services/productService";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send("Something Went Wrong!");
  }
});

export default router;
