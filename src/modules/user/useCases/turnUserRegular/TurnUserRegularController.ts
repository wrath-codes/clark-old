import { Request, Response } from "express";

import { TurnUserRegularUseCase } from "@user/turnUserRegular/TurnUserRegularUseCase";

export class TurnUserRegularController {
  async handle(request: Request, response: Response) {
    const { id_user } = request.params;

    const turnUserRegularUseCase = new TurnUserRegularUseCase();
    const user = await turnUserRegularUseCase.execute(id_user);

    return response.json(user);
  }
}
