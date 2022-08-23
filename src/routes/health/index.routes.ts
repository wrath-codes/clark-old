import { Router } from "express";

import { employerRoutes } from "@routes/health/employer.routes";
import { operatorRoutes } from "@routes/health/operators/index.routes";

const healthRoutes = Router();

healthRoutes.use("/operators", operatorRoutes);
healthRoutes.use("/employers", employerRoutes);

export { healthRoutes };
