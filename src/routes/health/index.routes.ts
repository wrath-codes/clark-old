import { Router } from "express";
import { operatorRoutes } from "./operator.routes";

const healthRoutes = Router();

healthRoutes.use("/operators", operatorRoutes);

export { healthRoutes };
