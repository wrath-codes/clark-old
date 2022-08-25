/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

import { ImportPlansUseCase } from "./ImportPlansUseCase";

export class ImportPlansController {
  async handle(req: Request, res: Response) {
    const { file }: any = req;
    const { id_operator }: any = req.params;

    const importPlansUseCase = new ImportPlansUseCase();

    await importPlansUseCase.execute(file, id_operator);

    return res.status(201).json({ message: "Plans imported!" });
  }
}
