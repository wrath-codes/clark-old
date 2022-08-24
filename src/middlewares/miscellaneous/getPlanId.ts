import { prisma } from "@database/prismaClient";
import { slugifyName } from "@utils/slugfyName";
import { NextFunction, Request, Response } from "express";


export const getPlanId = async (request: Request, response: Response, next: NextFunction) => {
  const { plan_name } = request.body;
  
  const planSlug = await slugifyName(plan_name);

  const plan = await prisma.plans.findFirst({
    where: {
      slug: planSlug,
    },
  });

  if (!plan) {
    throw new Error("Plan not found");
  }

  request.id_plan = plan.id;

  return next();
}