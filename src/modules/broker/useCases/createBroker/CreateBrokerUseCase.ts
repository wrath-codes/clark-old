import { prisma } from "@database/prismaClient";
import { slugifyName } from "src/utils/slugfyName";

interface ICreateBroker {
	name: string;
	cnpj: string;
	address: {
		street: string;
		number: number;
		complement?: string;
		neighborhood: string;
		city: string;
		state: string;
		zipCode: string;
	};
}

/**
 * @description UseCase responsible for creating a broker
 * @author Raphael Vaz
 */
export class CreateBrokerUseCase {
	async execute({ name, cnpj, address }: ICreateBroker) {
		const broker = await prisma.brokers.create({
			data: {
				name,
				cnpj,
				slug: await slugifyName(name),
			},
		});

		const brokerWithAdress = await prisma.brokers.update({
			where: { id: broker.id },
			data: {
				address: {
					create: {
						street: address.street,
						number: Number(address.number),
						complement: address.complement,
						neighborhood: address.neighborhood,
						city: address.city,
						state: address.state,
						country: "Brasil",
						zipCode: address.zipCode,
					},
				},
			},
			include: { address: true },
		});

		return brokerWithAdress;
	}
}
