import { NextFunction, Request, Response } from "express";

/**
 * @description This function is responsible for checking if CNPJ is valid
 * @body {cnpj} cnpj
 * @passes true if the cnpj is valid
 * @throws {Error} if the cnpj is not valid
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const regexCNPJ = async (request: Request, response: Response, next: NextFunction) => {
  const { cnpj } = request.body;

  // passes if not provided provided
  if (!cnpj) {
    return next();
  }

  // eslint-disable-next-line no-useless-escape
  if (!/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(cnpj)) {
    throw new Error("CNPJ is not valid!");
  }

  return next();
};
