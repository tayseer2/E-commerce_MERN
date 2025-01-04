import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import userModel from "../models/userModel";

interface ExtendedRequest extends Request {
  user?: any;
}

const validateJWT = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.get("Authorization");

  if (!authorizationHeader) {
    res.status(401).send("Unauthorized");
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    res.status(403).send("Bearer token not found");
    return;
  }

  jwt.verify(
    token,
    "F5FiHQIZlBfT8UsF1BR6mUXOoBsQHwSN",
    async (err, payload) => {
      if (err) {
        res.status(401).send("Invalid token");
        return;
      }

      if (!payload) {
        res.status(401).send("Invalid token payload");
        return;
      }

      const userPayload = payload as {
        user: string;
        email: string;
        firstName: string;
        lastName: string;
      };

      // fetch user from database based on the payload
      const user = await userModel.findOne({ email: userPayload.email });
      req.user = user;
      next();
    }
  );
};

export default validateJWT;

