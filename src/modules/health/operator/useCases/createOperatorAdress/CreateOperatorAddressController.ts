import { Request, Response } from "express";
import { CreateOperatorAddressUseCase } from "./CreateOperatorAddressUseCase";

export class CreateOperatorAddressController {
	async handle(req: Request, res: Response) {
		const { id_operator } = req.params;
		const { number, complement, zipCode, street, neighborhood } = req.body;

		const createOperatorAddressUseCase = new CreateOperatorAddressUseCase();
		const operatorWithAdress = await createOperatorAddressUseCase.execute({
			id_operator,
			number,
			complement,
			zipCode,
			street,
			neighborhood,
		});

		return res.status(201).json(operatorWithAdress);
	}
}
