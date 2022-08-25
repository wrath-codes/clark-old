import { NextFunction, Request, Response } from "express";

/**
 * @description This function is responsible for checking if the cellphone is valid
 * @body {cellphone} cellphone of the user
 * @passes true if the cellphone is valid
 * @throws {Error} if the cellphone is not valid
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const regexCellphone = async (request: Request, response: Response, next: NextFunction) => {
  const { cellphone } = request.body;

  // passes if not provided provided
  if (!cellphone) {
    return next();
  }

  // eslint-disable-next-line no-useless-escape
  if (!/^\([1-9]{2}\)[9]{0,1}[6-9]{1}[0-9]{3}\-[0-9]{4}$/.test(cellphone)) {
    throw new Error("Cellphone is not valid!");
  }

  return next();
};
/** ------------------------------------------------------------------------------ */
