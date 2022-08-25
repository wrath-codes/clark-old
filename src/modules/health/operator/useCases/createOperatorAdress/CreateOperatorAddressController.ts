import { Request, Response } from "express";

import { CreateOperatorAddressUseCase } from "./CreateOperatorAddressUseCase";

/**
 * @description Controller responsible for creating an operator's address
 * @param {id_operator} request.params.id_operator - id of the operator
 * @request {number} request.body.number - number of the address
 * @request {string} request.body.street - street of the address
 * @request {string} request.body.complement - complement of the address
 * @request {string} request.body.neighborhood - neighborhood of the address
 * @request {string} request.body.zipCode - zipCode of the address
 * @returns JSON response with status 201 and the created operator's address
 * @author Raphael Vaz
 */
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
