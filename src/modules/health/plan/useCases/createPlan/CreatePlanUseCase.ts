import { prisma } from "@database/prismaClient";
import { PlanReach } from "@prisma/client";
import { slugifyName } from "@utils/slugfyName";

interface ICreatePlanUseCase {
	name: string;
	reach: PlanReach;
	ans_register: string;
	operatorId: string;

	obstetricsCare?: boolean;
	outpatientCare?: boolean;
	hospitalCare?: boolean;
}

export class CreatePlanUseCase {
	async execute({ name, reach, ans_register, operatorId, obstetricsCare, outpatientCare, hospitalCare }: ICreatePlanUseCase) {
		const plan = await prisma.plans.create({
			data: {
				name,
				slug: await slugifyName(name),
				reach,
				ans_register,
				operatorId,
				obstetricsCare: obstetricsCare ? obstetricsCare : false,
				outpatientCare: outpatientCare ? outpatientCare : false,
				hospitalCare: hospitalCare ? hospitalCare : false,
			},
		});

		return plan;
	}
}
