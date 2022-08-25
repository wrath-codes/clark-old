import { prisma } from "@database/prismaClient";
import { slugifyName } from "src/utils/slugfyName";

interface ICreateOperator {
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
  website: string;
}

/**
 * @description UseCase responsible for creating an operator
 * @author Raphael Vaz
 */
export class CreateOperatorUseCase {
  async execute({ name, cnpj, address, website }: ICreateOperator) {
    const operator = await prisma.operators.create({
      data: {
        name,
        cnpj,
        website,
        slug: await slugifyName(name),
      },
    });

    const operatorWithAdress = await prisma.operators.update({
      where: { id: operator.id },
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

    return operatorWithAdress;
  }
}
