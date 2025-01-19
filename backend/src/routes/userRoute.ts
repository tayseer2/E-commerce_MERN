import express from "express";
import { getMyOrders, login, register } from "../services/userService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";
import { getActiveCartForUser } from "../services/cartService";

const router = express.Router();

router.post("/register", async (request, response) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    console.log(request.body);
    const { statusCode, data } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    response.status(statusCode).json(data);
  } catch {
    response.status(500).send("Something went wrong!");
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const { statusCode, data } = await login({ email, password });
    response.status(statusCode).json(data);
  } catch {
    response.status(500).send("Something went wrong!");
  }
});

router.get("/my-orders", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const {statusCode, data} = await getMyOrders({ userId});
    res.status(statusCode).send(data);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});

export default router;
