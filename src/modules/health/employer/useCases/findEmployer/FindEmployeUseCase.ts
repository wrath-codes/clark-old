import { prisma } from "@database/prismaClient";

export class FindEmployerUseCase {
  async execute(id_employer: string) {
    const employer = await prisma.employers.findFirst({
      where: {
        id: id_employer,
      },
      include: {
        address: true,
        broker: true,
      },
    });

    return employer;
  }
}
