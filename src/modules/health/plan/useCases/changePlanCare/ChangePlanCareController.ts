import { Request, Response } from "express";
import { ChangePlanCareUseCase } from "./ChangePlanCareUseCase";

export class ChangePlanCareController {
	async handle(req: Request, res: Response) {
		const { id_plan } = req.params;
		const { obstetricsCare, outpatientCare, hospitalCare } = req.body;

		const changePlanCareUseCase = new ChangePlanCareUseCase();
		const plan = await changePlanCareUseCase.execute({
			id_plan,
			obstetricsCare,
			outpatientCare,
			hospitalCare,
		});

		return res.json(plan);
	}
}
