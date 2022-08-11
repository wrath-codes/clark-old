import { prisma } from "@database/prismaClient";
import { slugifyName } from "src/utils/slugfyName";

/** ------------------------------------------------------------------------------ */
interface ICreateOperator {
	name: string;
	cnpj: string;
	website: string;
}
/** ------------------------------------------------------------------------------ */
export class CreateOperatorUseCase {
	async execute({ name, cnpj, website }: ICreateOperator) {
		const operator = await prisma.operators.create({
			data: {
				name,
				cnpj,
				website,
				slug: await slugifyName(name),
			},
		});

		return operator;
	}
}
