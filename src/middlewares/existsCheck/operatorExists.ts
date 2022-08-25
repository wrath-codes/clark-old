import { prisma } from "@database/prismaClient";
import { NextFunction, Request, Response } from "express";

/**
 * @description This function is responsible for checking if the operator exists in the database by id
 * @params {id_operator} id of the operator
 * @throws {Error} if the operator doesn't exist
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const operatorExistsId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id_operator } = request.params;

  // check if operator with same id already exists
  const operatorExists = await prisma.operators.findFirst({
    where: { id: id_operator },
  });
  if (!operatorExists) {
    throw new Error("Operator does not exist!");
  }

  return next();
};

/**
 * @description This function is responsible for checking if the operator exists in the database by cnpj
 * @body {cnpj} cnpj of the operator
 * @throws {Error} if the operator already exists
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const operatorExistsCNPJ = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { cnpj } = request.body;

  // check if operator with same cnpj already exists
  const operatorExists = await prisma.operators.findFirst({
    where: { cnpj },
  });
  if (operatorExists) {
    throw new Error("Operator already exists!");
  }

  return next();
};
