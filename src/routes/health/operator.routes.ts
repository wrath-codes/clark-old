import { Router } from "express";
import { CreateOperatorController } from "../../modules/health/operator/useCases/createOperator/CreateOperatorController";

const operatorRoutes = Router();

const createOperatorController = new CreateOperatorController();

operatorRoutes.post("/", createOperatorController.handle);

export { operatorRoutes };
