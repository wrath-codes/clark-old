import { prisma } from "@database/prismaClient";
import { NextFunction, Request, Response } from "express";

/**
 * @description This function is responsible for checking if the operator has any plans
 * @params {id_operator} id of the operator
 * @throws {Error} if the operator doesn't have any plans to delete
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const operatorPlansCheck = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id_operator } = request.params;

  // checks if this operator has any plans
  const plans = await prisma.plans.findMany({
    where: { operatorId: id_operator },
  });

  if (plans.length === 0) {
    throw new Error("This operator doesn't have any plans");
  }

  return next();
};
