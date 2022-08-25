import { NextFunction, Request, Response } from "express";

import { prisma } from "../../database/prismaClient";

/**
 * @description This function is responsible for checking if the plan exists in the database by id
 * @params {id_plan} id of the plan
 * @throws {Error} if the plan doesn't exists
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const planExistsId = async (request: Request, response: Response, next: NextFunction) => {
  const { id_plan } = request.params;

  // check if plan with same id already exists
  const planExists = await prisma.plans.findFirst({
    where: { id: id_plan },
  });
  if (!planExists) {
    throw new Error("Plan does not exist!");
  }

  return next();
};

/**
 * @description This function is responsible for checking if the plan exists in the database by ans_register
 * @body {ans_register} ans_register of the plan
 * @throws {Error} if the plan already exists
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const planExistsAnsRegister = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { ans_register } = request.body;

  // check if plan with same ans_register already exists
  const planExists = await prisma.plans.findFirst({
    where: { ans_register },
  });
  if (planExists) {
    throw new Error("Plan already exists!");
  }

  return next();
};
