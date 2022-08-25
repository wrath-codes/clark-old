import { NextFunction, Request, Response } from "express";

/**
 * @description checks if address was provided
 * @param request.body.number - number of the address
 * @param request.body.zipCode - zipCode of the address
 * @passed true if all fields were provided
 * @throws {object} - error message
 * @author Raphael Vaz
 */
export const providedAdress = async (request: Request, response: Response, next: NextFunction) => {
  const { number, zipCode } = request.body;

  // checks if a number was provided
  if (!number) {
    throw new Error("Number is required");
  }
  // checks if a zipCode was provided
  if (!zipCode) {
    throw new Error("ZipCode is required");
  }

  return next();
};
