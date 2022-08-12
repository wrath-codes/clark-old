import { prisma } from "@database/prismaClient";
import { operatorAddress } from "@utils/address/getAddressFromZipCode";

interface ICreateOperatorAddress {
	id_operator: string;
	number: number;
	complement?: string;
	zipCode: string;
	street?: string;
	neighborhood?: string;
}

export class CreateOperatorAddressUseCase {
	async execute({
		id_operator,
		number,
		complement,
		zipCode,
		street,
		neighborhood,
	}: ICreateOperatorAddress) {
		const operatorWithAdress = await operatorAddress(zipCode).then(
			async (address) => {
				if (address.erro) {
					throw new Error("Zipcode not found");
				}

				if (address.logradouro === "" || address.bairro === "") {
					return await prisma.operators.update({
						where: { id: id_operator },
						data: {
							address: {
								create: {
									street: String(street),
									number: Number(number),
									complement,
									neighborhood: String(neighborhood),
									city: address.localidade,
									state: address.uf,
									country: "Brasil",
									zipCode: address.cep,
								},
							},
						},
						include: { address: true },
					});
				}

				return await prisma.operators.update({
					where: { id: id_operator },
					data: {
						address: {
							create: {
								street: address.logradouro,
								number: Number(number),
								complement,
								neighborhood: address.bairro,
								city: address.localidade,
								state: address.uf,
								country: "Brasil",
								zipCode: address.cep,
							},
						},
					},
					include: { address: true },
				});
			}
		);

		return operatorWithAdress;
	}
}
