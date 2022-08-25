import { prisma } from "@database/prismaClient";

interface IUpdadeOperatorContact {
  id_operator: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  cellphone?: string;
}

export class UpdateOperatorContactUseCase {
  async execute({ id_operator, firstName, lastName, email, cellphone }: IUpdadeOperatorContact) {
    const contact = await prisma.operatorContacts.update({
      where: { operatorId: id_operator },
      data: {
        firstName,
        lastName,
        email,
        cellphone,
      },
    });

    return contact;
  }
}
