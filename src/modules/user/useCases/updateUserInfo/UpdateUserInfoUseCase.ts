import { prisma } from "../../../../database/prismaClient";

interface IUpdateUserInfo {
	id_user: string;
	firstName?: string;
	lastName?: string;
	email?: string;
}

export class UpdateUserInfoUseCase {
	async execute({ id_user, firstName, lastName, email }: IUpdateUserInfo) {
		// check if user exists
		const userExists = await prisma.users.findFirst({
			where: {
				id: id_user,
			},
		});
		if (!userExists) {
			throw new Error("User does not exist!");
		}

		// check if email is an email
		if (email) {
			const isEmail =
				/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
					email
				);
			if (!isEmail) {
				throw new Error("Email is not valid!");
			}
		}

		// update user
		const user = await prisma.users.update({
			data: {
				firstName:
					userExists.firstName != firstName ? firstName : userExists.firstName,
				lastName:
					userExists.lastName != lastName ? lastName : userExists.lastName,
				email: userExists.email != email ? email : userExists.email,
			},
			where: {
				id: id_user,
			},
		});

		return user;
	}
}
