import { NextFunction, Request, Response } from "express";

interface IProvidedUser {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
}

/**
 * @description This function is responsible for checking if the user was provided
 * @body {email} email of the user
 * @body {password} password of the user
 * @body {passwordConfirmation} password confirmation of the user
 * @body {firstName} first name of the user
 * @body {lastName} last name of the user
 * @passes true if the user was provided
 * @throws {Error} if the user was not provided
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const providedUser = async (request: Request, response: Response, next: NextFunction) => {
  const { email, password, passwordConfirmation, firstName, lastName }: IProvidedUser =
    request.body;

  // checks if an email was provided
  if (!email) {
    throw new Error("Email was not provided!");
  }

  // checks if first name was provided
  if (!firstName) {
    throw new Error("First name was not provided!");
  }

  // checks if last name was provided
  if (!lastName) {
    throw new Error("Last name was not provided!");
  }

  // checks if password was provided
  if (!password) {
    throw new Error("Password was not provided!");
  }

  // checks if password confirmation was provided
  if (!passwordConfirmation) {
    throw new Error("Password confirmation was not provided!");
  }

  return next();
};
