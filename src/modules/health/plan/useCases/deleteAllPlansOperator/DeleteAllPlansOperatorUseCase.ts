import { prisma } from "@database/prismaClient";

export class DeleteAllPlansOperatorUseCase {
	async execute(id_operator: string) {
		await prisma.plans.deleteMany({
			where: { operatorId: id_operator },
		});
	}
}
