import { prisma } from "@database/prismaClient";
import { operatorInfo } from "@utils/address/getInfoFromCnpj";
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
		const cnpjFormatted = cnpj
			.replace(".", "")
			.replace("/", "")
			.replace("-", "")
			.replace(".", "");
		const info = await operatorInfo(cnpjFormatted);

		console.log(info);

		const operator = await prisma.operators.create({
			data: {
				name: info.name,
				cnpj,
				website,
				slug: await slugifyName(name),
			},
		});

		return operator;
	}
}
