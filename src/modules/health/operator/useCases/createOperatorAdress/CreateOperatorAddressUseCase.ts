import { prisma } from "@database/prismaClient";

interface ICreateOperatorAddress {
	id_operator: string;
	street: string;
	number: number;
	complement?: string;
	city: string;
	state: string;
	country: string;
	zipCode: string;
}

export class CreateOperatorAddressUseCase {
	async execute({
		id_operator,
		street,
		number,
		complement,
		city,
		state,
		country,
		zipCode,
	}: ICreateOperatorAddress) {
		// creates an address for the operator with the provided id
		const operatorWithAdress = await prisma.operators.update({
			where: { id: id_operator },
			data: {
				address: {
					create: {
						street,
						number,
						complement,
						city,
						state,
						country,
						zipCode,
					},
				},
			},
			include: { address: true },
		});

		return operatorWithAdress;
	}
}
