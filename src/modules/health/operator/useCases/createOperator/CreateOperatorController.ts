import { Request, Response } from "express";

import { CreateOperatorUseCase } from "@operator/createOperator/CreateOperatorUseCase";

/**
 * @description Controller responsible for creating an operator
 * @request {name} request.cnpj_info.name - name of the operator
 * @request {cnpj} request.cnpj_info.cnpj - cnpj of the operator
 * @request {address} request.cnpj_info.address - address of the operator
 * @request {website} request.body.website - website of the operator
 * @returns JSON response with status 201 and the created operator
 * @author Raphael Vaz
 */
export class CreateOperatorController {
	async handle(request: Request, response: Response) {
		const { name, cnpj, address } = request.cnpj_info;
		const { website } = request.body;

		const createOperatorUseCase = new CreateOperatorUseCase();

		const operator = await createOperatorUseCase.execute({
			name,
			cnpj,
			address,
			website,
		});

		return response.status(201).json(operator);
	}
}
