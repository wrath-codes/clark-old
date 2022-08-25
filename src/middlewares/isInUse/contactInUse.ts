import { prisma } from "@database/prismaClient";
import { NextFunction, Request, Response } from "express";

/**
 * @description This function is responsible for checking if a contact is using this email
 * @body {email} email of the contact
 * @throws {Error} if a contact is using this email
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const operatorContactInUse = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email } = request.body;

  // checks if this operator already has an address
  const emailInUse = await prisma.operatorContacts.findFirst({
    where: {
      email,
    },
  });
  if (emailInUse) {
    throw new Error("This email is already in use");
  }

  return next();
};
