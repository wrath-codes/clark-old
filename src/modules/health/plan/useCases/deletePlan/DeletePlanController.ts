import { Request, Response } from "express";
import { DeletePlanUseCase } from "./DeletePlanUseCase";

export class DeletePlanController {
	async handle(req: Request, res: Response) {
		const { id_plan } = req.params;

		const deletePlanUseCase = new DeletePlanUseCase();
		await deletePlanUseCase.execute(id_plan);

		return res.status(200).json({
			message: "Plan deleted successfully",
		});
	}
}
