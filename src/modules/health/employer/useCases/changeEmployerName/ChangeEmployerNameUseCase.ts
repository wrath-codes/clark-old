import { prisma } from "@database/prismaClient";
import { slugifyName } from "@utils/slugfyName";

export class ChangeEmployerNameUseCase {
  async execute(id_employer: string, name: string) {
    const employerWithDifferentName = await prisma.employers.update({
      where: {
        id: id_employer,
      },
      data: {
        name,
        slug: await slugifyName(name),
      },
      include: {
        address: true,
      },
    });

    return employerWithDifferentName;
  }
}