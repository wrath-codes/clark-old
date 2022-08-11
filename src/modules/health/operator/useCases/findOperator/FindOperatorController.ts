import { Request, Response } from "express";

import { FindOperatorUseCase } from "./FindOperatorUseCase";

export class FindOperatorController {
	async handle(request: Request, response: Response) {
		const { id_operator } = request.params;

		const findOperatorController = new FindOperatorUseCase();
		const operator = await findOperatorController.execute(id_operator);

		return response.json(operator);
	}
}
