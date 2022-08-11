import { prisma } from "@database/prismaClient";

interface ICreateOperatorLogin {
	id_operator: string;
	username: string;
	password: string;
}

/**
 * @description creates an operator login for the operator with the provided id
 * @param id_operator: string - id of the operator
 * @param username: string - username of the operator
 * @param password: string - password of the operator
 * @returns {object} - operator with the login created
 */
export class CreateOperatorLoginUseCase {
	async execute({ id_operator, username, password }: ICreateOperatorLogin) {
		// creates an login for the operator with the provided id
		const operatorWithLogin = await prisma.operators.update({
			where: { id: id_operator },
			data: {
				login: {
					create: {
						username,
						password,
					},
				},
			},
			include: { login: true },
		});

		return operatorWithLogin;
	}
}
