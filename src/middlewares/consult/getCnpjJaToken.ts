import { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";

interface CnpjJaPayload {
	idToken: string;
	ttl: number;
}

/**
 * @description This function is responsible for getting the token from cnpjja api
 * @returns {Promise<CnpjJaPayload>}
 * @author Raphael Vaz
 */
export const getCnpjJaToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const result = async (): Promise<CnpjJaPayload> => {
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

	const idToken = (await result()).idToken;
	const ttl = (await result()).ttl;

	req.idToken = idToken;
	req.ttl = ttl;

	return next();
};
