import { NextFunction, Request, Response } from "express";
import "express-async-errors";


const errorHandle = async (error: Error, request: Request, response: Response, next: NextFunction) => {
  if(error instanceof Error) {
    return response.status(400).json({
      message: error.message
    });
  }
  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  });
};

export { errorHandle };
