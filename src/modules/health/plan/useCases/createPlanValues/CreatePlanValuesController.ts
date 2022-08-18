import { Request, Response } from "express";
import { CreatePlanValuesUseCase } from "./CreatePlanValuesUseCase";

export class CreatePlanValuesController {
	async handle(request: Request, response: Response) {
		const { values } = request.body;
		const { id_plan } = request.params;

		const createPlanValuesUseCase = new CreatePlanValuesUseCase();
		const planWithValues = await createPlanValuesUseCase.execute({
			id_plan,
			values,
		});

		return response.status(201).json(planWithValues);
	}
}
