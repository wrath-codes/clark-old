import { Request, Response } from "express";
import { UpdatePlanValuesUseCase } from "./UpdatePlanValuesUseCase";

export class UpdatePlanValuesController {
	async handle(request: Request, response: Response) {
		const { id_plan } = request.params;
		const { values } = request.body;

		const updatePlanValuesUseCase = new UpdatePlanValuesUseCase();
		const planValues = await updatePlanValuesUseCase.execute({
			id_plan,
			values,
		});

		return response.json(planValues);
	}
}
