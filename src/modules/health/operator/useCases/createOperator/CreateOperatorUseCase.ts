import { prisma } from "@database/prismaClient";
import { operatorInfo } from "@utils/address/getInfoFromCnpj";
import { formatCep } from "@utils/format/formatCep";
import { formatCnpj } from "@utils/format/formatCnpj";
import { slugifyName } from "src/utils/slugfyName";

/** ------------------------------------------------------------------------------ */
interface ICreateOperator {
	name: string;
	cnpj: string;
	website: string;
}
/** ------------------------------------------------------------------------------ */
export class CreateOperatorUseCase {
	async execute({ cnpj, website }: ICreateOperator) {
		const cnpjFormatted = await formatCnpj(cnpj);

		const info = await operatorInfo(cnpjFormatted);

		const operator = await prisma.operators.create({
			data: {
				name: info.name,
				cnpj,
				website,
				slug: await slugifyName(info.name),
			},
		});
		const formatedZipCode = await formatCep(info.address.zip);

		const operatorWithAdress = await prisma.operators.update({
			where: { id: operator.id },
			data: {
				address: {
					create: {
						street: info.address.street,
						number: Number(info.address.number),
						complement: info.address.details,
						neighborhood: info.address.district,
						city: info.address.city,
						state: info.address.state,
						country: "Brasil",
						zipCode: formatedZipCode,
					},
				},
			},
			include: { address: true },
		});

		return operatorWithAdress;
	}
}
