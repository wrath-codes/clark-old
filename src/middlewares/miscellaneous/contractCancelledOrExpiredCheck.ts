import { prisma } from "@database/prismaClient";
import { NextFunction, Request, Response } from "express";


export const contractCancelledOrExpiredCheck = async (request: Request, response: Response, next: NextFunction) => {
  const { id_contract } = request.params;

  const contract = await prisma.contracts.findFirst({
    where: { id: id_contract },
    include: {
      operator: true,
      employer: true
    }
  });


  if (contract!.status === "CANCELADO" || contract!.status === "EXPIRADO") {
    throw new Error("Contract is cancelled or expired!");
  }

  next();
}