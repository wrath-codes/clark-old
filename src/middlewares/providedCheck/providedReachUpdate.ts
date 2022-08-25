import { NextFunction, Request, Response } from "express";

/**
 * @description checks if a plan's reach is valid
 * @param request.body.reach - reach of the plan
 * @passed true if reach is valid
 * @throws {object} - error message
 * @author Raphael Vaz
 */
export const providedReachUpdate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { reach } = request.body;

  // checks if has a valid input
  // valid inputs are MUNICIPIO | GRUPO_MUNICIPIOS | ESTADO | GRUPO_ESTADOS | NACIONAL
  if (
    reach === "MUNICIPIO" ||
    reach === "GRUPO_MUNICIPIOS" ||
    reach === "ESTADO" ||
    reach === "GRUPO_ESTADOS" ||
    reach === "NACIONAL" ||
    reach === undefined
  ) {
    return next();
  }
  throw new Error(
    "Reach needs to be MUNICIPIO or GRUPO_MUNICIPIOS or ESTADO or GRUPO_ESTADOS or NACIONAL"
  );
};
