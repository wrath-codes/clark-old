/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import "express-async-errors";

/**
 * @description This function is responsible for error handling
 * @param {Error} error - error object
 * @returns response with error message and status code
 * @author Raphael Vaz
 */
const errorHandle = async (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof Error) {
    return response.status(400).json({
      message: error.message,
    });
  }
  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

export { errorHandle };
