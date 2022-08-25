import { NextFunction, Request, Response } from "express";

/**
 * @description checks if a plan was provided
 * @param request.body.name - name of the plan
 * @param request.body.ans_register - ANS Register of the plan
 * @param request.body.reach - reach of the plan
 * @passed true if all fields were provided
 * @throws {object} - error message
 * @author Raphael Vaz
 */
export const providedPlan = async (request: Request, response: Response, next: NextFunction) => {
  const { name, ans_register, reach } = request.body;

  // checks if a name was provided
  if (!name) {
    throw new Error("Name is required!");
  }
  // checks if a ans_register was provided
  if (!ans_register) {
    throw new Error("ANS Register is required!");
  }
  // checks if a reach was provided
  if (!reach) {
    throw new Error("Reach is required!");
  }

  return next();
};
