import { prisma } from "@database/prismaClient";

export class FindPlanUseCase {
	async execute(id_plan: string) {
		const plan = await prisma.plans.findFirst({
			where: {
				id: id_plan,
			},
		});

		return plan;
	}
}
