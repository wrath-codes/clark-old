import { Router } from "express";

import { operatorRoutes } from "@routes/health/operator.routes";

const healthRoutes = Router();

healthRoutes.use("/operators", operatorRoutes);

export { healthRoutes };
