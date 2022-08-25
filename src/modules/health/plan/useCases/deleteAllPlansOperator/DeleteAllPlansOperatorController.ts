import { Request, Response } from "express";

import { DeleteAllPlansOperatorUseCase } from "./DeleteAllPlansOperatorUseCase";

export class DeleteAllPlansOperatorController {
  async handle(req: Request, res: Response) {
    const deleteAllPlansOperatorUseCase = new DeleteAllPlansOperatorUseCase();

    const { id_operator } = req.params;

    await deleteAllPlansOperatorUseCase.execute(id_operator);

    return res.status(200).json({
      message: "All plans of operator deleted",
    });
  }
}
