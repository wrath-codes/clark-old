import { prisma } from "@database/prismaClient";

interface IChangePlanCare {
	obstetricsCare?: boolean;
	outpatientCare?: boolean;
	hospitalCare?: boolean;

	id_plan?: string;
}

export class ChangePlanCareUseCase {
	async execute({
		id_plan,
		obstetricsCare,
		outpatientCare,
		hospitalCare,
	}: IChangePlanCare) {
		const plan = await prisma.plans.update({
			where: { id: id_plan },
			data: {
				obstetricsCare,
				outpatientCare,
				hospitalCare,
			},
		});

		return plan;
	}
}
