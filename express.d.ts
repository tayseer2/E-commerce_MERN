// src/types/express.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        // Add other user properties here if needed
      };
    }
  }
}
