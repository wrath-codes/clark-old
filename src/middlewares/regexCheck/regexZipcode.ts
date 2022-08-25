import { NextFunction, Request, Response } from "express";

/** ------------------------------------------------------------------------------ */
/**
 * @description checks if Zipcode is valid
 * @param request.body.zipCode
 */
/** ------------------------------------------------------------------------------ */
export const regexZipCode = async (request: Request, response: Response, next: NextFunction) => {
  const { zipCode } = request.body;

  // passes if not provided provided
  if (!zipCode) {
    return next();
  }

  if (zipCode.length !== 8) {
    throw new Error("Zipcode needs to be 8 digits");
  }

  const test = zipCode.slice(0, 5);
  const test2 = zipCode.slice(5, 8);
  const result = `${test}-${test2}`;

  if (!/^[0-9]{5}-[0-9]{3}$/.test(result)) {
    throw new Error("Zipcode is not valid!");
  }

  return next();
};
/** ------------------------------------------------------------------------------ */
