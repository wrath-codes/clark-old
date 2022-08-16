import { prisma } from "@database/prismaClient";

interface IUpdateOperatorLogin {
	id_operator: string;
	username?: string;
	password?: string;
}

export class UpdateOperatorLoginUseCase {
	async execute({ id_operator, username, password }: IUpdateOperatorLogin) {
		const login = await prisma.logins.update({
			where: { operatorId: id_operator },
			data: {
				username,
				password,
			},
		});

		return login;
	}
}
