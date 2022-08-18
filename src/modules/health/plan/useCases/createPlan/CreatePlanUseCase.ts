import { prisma } from "@database/prismaClient";
import { PlanReach } from "@prisma/client";
import { slugifyName } from "@utils/slugfyName";

interface ICreatePlanUseCase {
	name: string;
	reach: PlanReach;
	ans_register: string;
	operatorId: string;
}

export class CreatePlanUseCase {
	async execute({ name, reach, ans_register, operatorId }: ICreatePlanUseCase) {
		const plan = await prisma.plans.create({
			data: {
				name,
				slug: await slugifyName(name),
				reach,
				ans_register,
				operatorId,
			},
		});

		return plan;
	}
}
