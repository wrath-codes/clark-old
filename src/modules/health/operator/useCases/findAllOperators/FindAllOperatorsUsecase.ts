import { prisma } from "@database/prismaClient";

export class FindAllOperatorsUseCase {
	async execute() {
		const operators = await prisma.operators.findMany({
			orderBy: {
				name: "asc",
			},
			include: {
				address: true,
				contact: true,
				login: true,
			},
		});

		return operators;
	}
}
