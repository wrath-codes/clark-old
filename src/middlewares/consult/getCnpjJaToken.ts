import { NextFunction, Request, Response } from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import fetch from "node-fetch";

interface ICnpjJaPayload {
  idToken: string;
  ttl: number;
}

/**
 * @description This function is responsible for getting the token from cnpjja api
 * @returns {Promise<ICnpjJaPayload>}
 * @author Raphael Vaz
 */
export const getCnpjJaToken = async (req: Request, res: Response, next: NextFunction) => {
  const result = async (): Promise<ICnpjJaPayload> => {
    // eslint-disable-next-line no-return-await
    return await fetch(`${process.env.CNPJJA_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",

      body: JSON.stringify({
        username: process.env.CNPJJA_USERNAME,
        password: process.env.CNPJJA_PASSWORD,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  };

  const { idToken } = await result();
  const { ttl } = await result();

  req.idToken = idToken;
  req.ttl = ttl;

  return next();
};
