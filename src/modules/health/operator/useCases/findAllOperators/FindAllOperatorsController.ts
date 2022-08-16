import { Request, Response } from "express";
import { FindAllOperatorsUseCase } from "./FindAllOperatorsUsecase";

export class FindAllOperatorsController {
	async handle(request: Request, response: Response) {
		const findAllOperatorsUseCase = new FindAllOperatorsUseCase();
		const operators = await findAllOperatorsUseCase.execute();

		return response.json(operators);
	}
}
