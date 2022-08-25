import { prisma } from "@database/prismaClient";
import { NextFunction, Request, Response } from "express";

/**
 * @description This function is responsible for checking if the operator already has a login
 * @params {id_operator} id of the operator
 * @throws {Error} if the operator already has a login
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const operatorLoginCheck = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id_operator } = request.params;

  // checks if this operator already has an Login
  const login = await prisma.logins.findFirst({
    where: {
      operatorId: id_operator,
    },
  });
  if (login) {
    throw new Error("This operator already has a login");
  }

  return next();
};
