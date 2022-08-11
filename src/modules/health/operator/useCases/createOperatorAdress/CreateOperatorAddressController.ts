import { Request, Response } from "express";
import { CreateOperatorAddressUseCase } from "./CreateOperatorAddressUseCase";

export class CreateOperatorAddressController {
	async handle(req: Request, res: Response) {
		const { id_operator } = req.params;
		const { street, number, complement, city, state, country, zipCode } =
			req.body;

		const createOperatorAddressUseCase = new CreateOperatorAddressUseCase();
		const operatorWithAdress = await createOperatorAddressUseCase.execute({
			id_operator,
			street,
			number,
			complement,
			city,
			state,
			country,
			zipCode,
		});

		return res.status(201).json(operatorWithAdress);
	}
}
