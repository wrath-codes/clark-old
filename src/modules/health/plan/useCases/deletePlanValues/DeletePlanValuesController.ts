import { Request, Response } from "express";
import { DeletePlanValuesUseCase } from "./DeletePlanValuesUseCase";

export class DeletePlanValuesController {
	async handle(request: Request, response: Response) {
		const { id_plan } = request.params;
		const deletePlanValuesUseCase = new DeletePlanValuesUseCase();
		await deletePlanValuesUseCase.execute(id_plan);

		return response.json({
			message: "Plan values deleted successfully",
		});
	}
}
