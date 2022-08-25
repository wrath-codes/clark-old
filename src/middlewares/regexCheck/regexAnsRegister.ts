import { NextFunction, Request, Response } from "express";

/**
 * @description This function is responsible for checking if the ans register is valid
 * @body {ans_register} ans register of the plan
 * @passes true if the ans_register is valid
 * @throws {Error} if the ans register is not valid
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const regexAnsRegister = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { ans_register } = request.body;

  // passes if not provided provided
  if (!ans_register) {
    return next();
  }

  if (!/^\d{9}$/.test(ans_register)) {
    throw new Error("ANS Register is not valid!");
  }

  return next();
};
/** ------------------------------------------------------------------------------ */
