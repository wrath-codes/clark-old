import { prisma } from "../../../../database/prismaClient";

export class TurnUserAdminUseCase {
  async execute(id_user: string) {
    // check if user exists
    const userExists = await prisma.users.findFirst({
      where: {
        id: id_user,
      },
    });
    if (!userExists) {
      throw new Error("User does not exist!");
    }

    // update user
    const user = await prisma.users.update({
      data: {
        isAdmin: true,
      },
      where: {
        id: id_user,
      },
    });

    return user;
  }
}
