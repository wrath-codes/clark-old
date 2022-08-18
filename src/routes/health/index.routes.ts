import { Router } from "express";

import { operatorRoutes } from "@routes/health/operators/index.routes";

const healthRoutes = Router();

healthRoutes.use("/operators", operatorRoutes);

export { healthRoutes };
