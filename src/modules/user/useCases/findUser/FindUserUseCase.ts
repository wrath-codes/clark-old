import { prisma } from "../../../../database/prismaClient";

interface IFindUser {
	id_user: string;
}

export class FindUserUseCase {
	async execute({ id_user }: IFindUser) {
		const user = await prisma.users.findUnique({
			where: {
				id: id_user,
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				isAdmin: true,
			},
		});

		return user;
	}
}
