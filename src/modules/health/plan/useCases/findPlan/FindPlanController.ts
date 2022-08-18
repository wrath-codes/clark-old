import { Request, Response } from "express";
import { FindPlanUseCase } from "./FindPlanUseCase";

export class FindPlanController {
	async handle(req: Request, res: Response) {
		const { id_plan } = req.params;

		const findPlanUseCase = new FindPlanUseCase();

		const plan = await findPlanUseCase.execute(id_plan);

		return res.json(plan);
	}
}
