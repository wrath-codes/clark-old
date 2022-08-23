import { prisma } from "@database/prismaClient";
import { NextFunction, Request, Response } from "express";





export const contractExixtsId = async(
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id_contract } = request.params;

  // check if operator with same id already exists
  const contractExists = await prisma.contracts.findFirst({
    where: { id: id_contract },
  });
  if (!contractExists) {
    throw new Error("Contract does not exist!");
  }

  return next();
}

export const contractExistsNumber = async(
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { number } = request.body;
  
  // check if operator with same cnpj already exists
  const contractExists = await prisma.contracts.findFirst({
    where: { number },
  });
  if (contractExists) {
    throw new Error("Contract already exists!");
  }

  return next();
}


