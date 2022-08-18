import { Request, Response } from "express";
import { UpdatePlanUseCase } from "./UpdatePlanUseCase";

export class UpdatePlanController {
	async handle(req: Request, res: Response) {
		const { id_plan } = req.params;
		const { name, ans_register, reach } = req.body;

		const updatePlanUseCase = new UpdatePlanUseCase();

		const plan = await updatePlanUseCase.execute({
			id_plan,
			name,
			ans_register,
			reach,
		});

		return res.json(plan);
	}
}
