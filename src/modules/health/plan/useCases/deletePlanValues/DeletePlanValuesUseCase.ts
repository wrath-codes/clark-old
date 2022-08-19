import { prisma } from "@database/prismaClient";

export class DeletePlanValuesUseCase {
	async execute(id_plan: string) {
		await prisma.planValues.delete({
			where: { planId: id_plan },
		});
	}
}
