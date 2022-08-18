import { prisma } from "@database/prismaClient";
import { NextFunction, Request, Response } from "express";

/**
 * @description This function is responsible for checking if the plan already has a it's values
 * @params {id_plan} id of the plan
 * @throws {Error} if the plan already has its values
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */

export const planValuesExists = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { id_plan } = request.params;

	const planValues = await prisma.planValues.findFirst({
		where: { id: id_plan },
	});

	if (planValues) {
		throw new Error("The plan already has its values");
	}

	return next();
};
