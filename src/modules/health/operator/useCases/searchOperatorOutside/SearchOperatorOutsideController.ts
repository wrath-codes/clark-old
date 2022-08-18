import { Request, Response } from "express";
import { SearchOperatorOutsideUseCase } from "./SearchOperatorOutsideUseCase";

export class SearchOperatorOutsideController {
	async handle(request: Request, response: Response) {
		const { cnpj_operator } = request.params;
		const token = request.idToken;

		const searchOperatorOutsideUseCase = new SearchOperatorOutsideUseCase();

		const operator = await searchOperatorOutsideUseCase.execute({
			cnpj_operator,
			token,
		});

		return response.json(operator);
	}
}
