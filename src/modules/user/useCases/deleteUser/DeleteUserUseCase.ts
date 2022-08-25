import { prisma } from "@database/prismaClient";

export class DeleteUserUseCase {
  async execute(id_user: string) {
    // check if user exists
    const user = await prisma.users.findFirst({
      where: {
        id: id_user,
      },
    });

    if (!user) {
      throw new Error("User does not exist!");
    }

    // delete user
    await prisma.users.delete({
      where: {
        id: id_user,
      },
    });
    return true;
  }
}
