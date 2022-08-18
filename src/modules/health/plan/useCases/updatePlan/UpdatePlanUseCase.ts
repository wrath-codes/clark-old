import { prisma } from "@database/prismaClient";
import { PlanReach } from "@prisma/client";
import { slugifyName } from "@utils/slugfyName";

interface IUpdatePlan {
	id_plan: string;
	name?: string;
	ans_register?: string;
	reach?: PlanReach;
}

export class UpdatePlanUseCase {
	async execute({ id_plan, name, ans_register, reach }: IUpdatePlan) {
		const planForSlugify = await prisma.plans.findFirst({
			where: { id: id_plan },
		});

		const plan = await prisma.plans.update({
			where: { id: id_plan },
			data: {
				name,
				slug: name
					? await slugifyName(name!)
					: await slugifyName(planForSlugify?.name!),
				ans_register,
				reach,
			},
		});

		return plan;
	}
}
