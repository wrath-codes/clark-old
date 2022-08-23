import { prisma } from "@database/prismaClient";
import { NextFunction, Request, Response } from "express";

/**
 * @description This function is responsible for checking if the employer exists in the database by id
 * @params {id_employer} id of the employer
 * @throws {Error} if the employer doesn't exist
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const employerExistsId = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { id_employer } = request.params;

	// check if employer with same id already exists
	const employerExists = await prisma.employers.findFirst({
		where: { id: id_employer },
	});
	if (!employerExists) {
		throw new Error("Employer does not exist!");
	}

	return next();
};

/**
 * @description This function is responsible for checking if the employer exists in the database by cnpj
 * @body {cnpj} cnpj of the employer
 * @throws {Error} if the employer already exists
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const employerExistsCNPJ = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { cnpj } = request.body;

	// check if employer with same cnpj already exists
	const employerExists = await prisma.employers.findFirst({
		where: { cnpj },
	});
	if (employerExists) {
		throw new Error("Employer already exists!");
	}

	return next();
};
