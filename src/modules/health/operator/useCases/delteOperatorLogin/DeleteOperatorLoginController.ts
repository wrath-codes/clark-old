import { Request, Response } from "express";

import { DeleteOperatorLoginUseCase } from "./DeleteOperatorLoginUseCase";

/**
 * @class DeleteOperatorLoginController
 * @description Controller class that implements the use case
 * @access public
 * @implements {DeleteOperatorLoginUseCase}
 * @returns message: string - message of the operation
 */

export class DeleteOperatorLoginController {
  async handle(req: Request, res: Response) {
    const { id_operator } = req.params;
    const deleteOperatorLoginController = new DeleteOperatorLoginUseCase();
    await deleteOperatorLoginController.execute(id_operator);
    res.status(200).json({ message: "Operator login deleted successfully" });
  }
}
