import { prisma } from "@database/prismaClient";


export class DeleteEmployerUseCase {
  async execute(id_employer: string) {
    await prisma.employers.delete({
      where: {
        id: id_employer
      },
    });
  }
}