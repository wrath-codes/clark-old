import { prisma } from "@database/prismaClient";

export class FindAllUsersUseCase {
  async execute() {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isAdmin: true,
      },
    });
    return users;
  }
}
