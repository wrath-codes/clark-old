import { prisma } from "@database/prismaClient";

export class FindOperatorUseCase {
	async execute(id_operator: string) {
		const operator = await prisma.operators.findFirst({
			where: { id: id_operator },
			include: {
				address: true,
				contact: true,
				login: true,
			},
		});

		return operator;
	}
}
