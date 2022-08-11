import { prisma } from "@database/prismaClient";
import { hash } from "bcrypt";

/** ------------------------------------------------------------------------------ */
interface ICreateUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	passwordConfirmation: string;
	isAdmin?: boolean;
}
/** ------------------------------------------------------------------------------ */
export class CreateUserUseCase {
	async execute({
		firstName,
		lastName,
		email,
		password,
		passwordConfirmation,
		isAdmin,
	}: ICreateUser) {
		// hash password
		const hashedPassword = await hash(password, 10);

		console.log(isAdmin, firstName, lastName);

		// save user in database
		const user = await prisma.users.create({
			data: {
				firstName,
				lastName,
				email,
				password: hashedPassword,
				isAdmin,
			},
		});

		return user;
	}
}
