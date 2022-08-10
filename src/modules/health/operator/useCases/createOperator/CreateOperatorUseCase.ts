import { prisma } from "../../../../../database/prismaClient";

interface ICreateOperator {
	name: string;
	cnpj: string;
	website: string;
}

export class CreateOperatorUseCase {
	async execute({ name, cnpj, website }: ICreateOperator) {
		// checks if it's a valid cnpj
		const isCNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(cnpj);
		if (!isCNPJ) {
			throw new Error("CNPJ is not valid!");
		}

		// checks if it's a valid website
		const isWebsite =
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
				website
			);
		if (!isWebsite) {
			throw new Error("Website is not valid!");
		}

		// check if operator with same cnpj already exists
		const operatorExists = await prisma.operators.findFirst({
			where: { cnpj },
		});
		if (operatorExists) {
			throw new Error("Operator already exists");
		}

		const operator = await prisma.operators.create({
			data: {
				name,
				cnpj,
				website,
			},
		});

		return operator;
	}
}
