import { Request, Response } from "express";
import { CreateOperatorUseCase } from "./CreateOperatorUseCase";

export class CreateOperatorController {
	async handle(request: Request, response: Response) {
		const { name, cnpj, website } = request.body;

		const createOperatorUseCase = new CreateOperatorUseCase();

		const operator = await createOperatorUseCase.execute({
			name,
			cnpj,
			website,
		});

		return response.json(operator);
	}
}
