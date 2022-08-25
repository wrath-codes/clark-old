import { NextFunction, Request, Response } from "express";

/**
 * @description This function is responsible for checking if the email is valid
 * @body {email} email of the user
 * @passes true if the email is valid
 * @throws {Error} if the email is not valid
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const regexEmail = async (request: Request, response: Response, next: NextFunction) => {
  const { email } = request.body;

  // passes if not provided provided
  if (!email) {
    return next();
  }

  // eslint-disable-next-line no-useless-escape
  if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
    throw new Error("Email is not valid!");
  }
  return next();
};
