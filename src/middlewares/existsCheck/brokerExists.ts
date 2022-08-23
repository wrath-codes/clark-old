import { prisma } from "@database/prismaClient";
import { NextFunction, Request, Response } from "express";

/**
 * @description This function is responsible for checking if the broker exists in the database by id
 * @params {id_broker} id of the broker
 * @throws {Error} if the broker doesn't exist
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const brokerExistsId = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { id_broker } = request.params;

	// check if broker with same id already exists
	const brokerExists = await prisma.brokers.findFirst({
		where: { id: id_broker },
	});
	if (!brokerExists) {
		throw new Error("Broker does not exist!");
	}

	return next();
};

/**
 * @description This function is responsible for checking if the broker exists in the database by cnpj
 * @body {cnpj} cnpj of the broker
 * @throws {Error} if the broker already exists
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const brokerExistsCNPJ = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { cnpj } = request.body;

	// check if broker with same cnpj already exists
	const brokerExists = await prisma.brokers.findFirst({
		where: { cnpj },
	});
	if (brokerExists) {
		throw new Error("Broker already exists!");
	}

	return next();
};
