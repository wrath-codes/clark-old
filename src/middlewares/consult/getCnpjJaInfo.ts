import { formatCep } from "@utils/format/formatCep";
import { formatCnpj } from "@utils/format/formatCnpj";
import { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";

interface CnpjInfoPayload {
	cnpj_info: {
		name: string;
		cnpj: string;
		address: {
			street: string;
			number: number;
			complement?: string;
			neighborhood: string;
			city: string;
			state: string;
			zipCode: string;
		};
	};
}

/**
 *
 * @description This function is responsible for getting the cnpj info from cnpjja api
 * @returns {Promise<CnpjInfoPayload>}
 * @author Raphael Vaz
 */

export const getCnpjJaInfo = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const result = async (): Promise<CnpjInfoPayload> => {
		return await formatCnpj(req.body.cnpj).then(async (cnpj) => {
			return await fetch(`${process.env.CNPJJA_URL}/office/${cnpj}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					charset: "utf-8",
					"access-control-allow-origin": "*",
					Authorization: `Bearer ${req.idToken}`,
				},
				redirect: "follow",
			})
				.then((response) => {
					if (response.status === 400) {
						throw new Error("CNPJ not found");
					} else {
						return response.json();
					}
				})
				.then(async (data) => {
					return {
						cnpj_info: {
							name: data.alias !== null ? data.alias : data.company.name,
							cnpj: req.body.cnpj,
							address: {
								street: data.address.street,
								number: Number(data.address.number),
								complement: data.address.details,
								neighborhood: data.address.district,
								city: data.address.city,
								state: data.address.state,
								zipCode: await formatCep(data.address.zip),
							},
						},
					};
				});
		});
	};

	const formattedInfo = (await result()).cnpj_info;

	req.cnpj_info = formattedInfo;

	return next();
};
