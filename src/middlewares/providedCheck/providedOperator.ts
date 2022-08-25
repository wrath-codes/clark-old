import { NextFunction, Request, Response } from "express";

/**
 * @description This function is responsible for checking if the operator was provided
 * @body {cnpj} cnpj of the operator
 * @body {website} website of the operator
 * @passes true if the operator was provided
 * @throws {Error} if the operator was not provided
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const providedOperator = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { website, cnpj } = request.body;
  // checks if a website was provided
  if (!website) {
    throw new Error("Website is not provided!");
  }
  // checks if a cnpj was provided
  if (!cnpj) {
    throw new Error("CNPJ is not provided!");
  }

  return next();
};
