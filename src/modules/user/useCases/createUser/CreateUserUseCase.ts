import { hash } from 'bcrypt';
import { prisma } from "../../../../database/prismaClient";

interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  isAdmin?: boolean;
}

export class CreateUserUseCase {
  async execute({ firstName, lastName, email, password, passwordConfirmation, isAdmin }: ICreateUser) {
    // check if user with same email already exists
    const userExists = await prisma.users.findFirst({
      where: { email },
    });
    if (userExists) {
      throw new Error('User already exists');
    }

    // check if password and password confirmation match
    if (password !== passwordConfirmation) {
      throw new Error('Passwords do not match');
    }

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