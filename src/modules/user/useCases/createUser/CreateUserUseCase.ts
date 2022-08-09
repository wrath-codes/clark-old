import { hash } from 'bcrypt';
import { prisma } from "../../../../database/prismaClient";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  isAdmin?: boolean;
}

export class CreateUserUseCase {
  async execute({ name, email, password, passwordConfirmation, isAdmin}: ICreateUser) {
    // check if user with same email already exists
    const userExists = await prisma.user.findFirst({
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

    // save user in database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false,
      },
    });

    return user;
  }
}