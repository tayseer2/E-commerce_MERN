import express from "express";
import { getActiveCartForUser } from "../services/cartService";
import validateJWT from "../midlewares/validateJWT";

const router = express.Router();

router.get("/", validateJWT, async (req, res) => {
  const userId = req?.user?._id;
  const cart = await getActiveCartForUser({ userId });
  res.status(200).send(cart);
});

export default router;
