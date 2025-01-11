import { login, register } from "./../services/userService";
import express from "express";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { statusCode, data } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(statusCode).json(data);
  } catch (err) {
    res.status(500).send("Something Went Wrong!");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { statusCode, data } = await login({ email, password });
    res.status(statusCode).json(data);
  } catch (err) {
    res.status(500).send("Something Went Wrong!");
  }
});

export default router;
