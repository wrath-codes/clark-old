import { prisma } from "@database/prismaClient";



export class FindAllEmployersUseCase {
  async execute() {
    const employers = await prisma.employers.findMany();

    return employers;
  }
}