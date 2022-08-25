import { NextFunction, Request, Response } from "express";

export const providedCNPJ = async (request: Request, response: Response, next: NextFunction) => {
  const { cnpj } = request.body;

  // checks if a cnpj was provided
  if (!cnpj) {
    throw new Error("CNPJ is not provided!");
  }

  return next();
};
