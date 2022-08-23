import { prisma } from "@database/prismaClient";
import { slugifyName } from "@utils/slugfyName";


interface ICreateEmployer {
  name: string;
	cnpj: string;
	address: {
		street: string;
		number: number;
		complement?: string;
		neighborhood: string;
		city: string;
		state: string;
		zipCode: string;
  };
}

export class CreateEmployerUseCase {
  async execute({ name, cnpj, address }: ICreateEmployer) {
    const employer = await prisma.employers.create({
      data: {
        name,
        cnpj,
        slug: await slugifyName(name),
      },
    });

    const employerWithAdress = await prisma.employers.update({
      where: { id: employer.id },
      data: {
        address: {
          create: {
            street: address.street,
            number: Number(address.number),
            complement: address.complement,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
            country: "Brasil",
            zipCode: address.zipCode,
          },
        },
      },
      include: { address: true },
    });

    return employerWithAdress;
  }
}