import { prisma } from "@database/prismaClient";

interface ICreateOperatorContact {
	id_operator: string;
	firstName: string;
	lastName: string;
	email: string;
	cellphone: string;
}

export class CreateOperatorContactUseCase {
	async execute({
		id_operator,
		firstName,
		lastName,
		email,
		cellphone,
	}: ICreateOperatorContact) {
		// creates a contact for the operator with the provided id
		const operatorWithContact = await prisma.operators.update({
			where: { id: id_operator },
			data: {
				contact: {
					create: {
						firstName,
						lastName,
						email,
						cellphone,
					},
				},
			},
			include: { contact: true },
		});

		return operatorWithContact;
	}
}
