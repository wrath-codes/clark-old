import { prisma } from "@database/prismaClient";
import { NextFunction, Request, Response } from "express";

/**
 * @description This function is responsible for checking if the plan already has a it's values
 * @params {id_plan} id of the plan
 * @throws {Error} if the plan already has its values
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */

export const planValuesExists = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id_plan } = request.params;

  const planDeal = await prisma.planDeals.findFirst({
    where: { planId: id_plan },
  });

  if (planDeal.values) {
    throw new Error("The plan already has its values");
  }

  return next();
};

export const planValuesExistsDeleteUpdate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id_plan } = request.params;

  const planValues = await prisma.planValues.findFirst({
    where: { planId: id_plan },
  });

  console.log(planValues);

  if (planValues) {
    return next();
  }

  throw new Error("This plan doesn't have values!");
};
