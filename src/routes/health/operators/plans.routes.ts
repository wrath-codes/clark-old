// import libraries
import { Router } from "express";

// import middlewares
import {
	planExistsAnsRegister,
	planExistsId,
} from "@middlewares/existsCheck/planExists";
import { planValuesExists } from "@middlewares/existsCheck/planValuesExists";
import { providedPlan } from "@middlewares/providedCheck/providedPlan";
import { regexAnsRegister } from "@middlewares/regexCheck/regexAnsRegister";
import { regexReach } from "@middlewares/regexCheck/regexReach";

// import controllers
import { CreatePlanController } from "@plan/createPlan/CreatePlanController";
import { CreatePlanValuesController } from "@plan/createPlanValues/CreatePlanValuesController";
import { FindAllPlansOperatorController } from "@plan/findAllPlansOperator/FindAllPlansOperatorController";
import { FindPlanController } from "@plan/findPlan/FindPlanController";
import { UpdatePlanController } from "@plan/updatePlan/UpdatePlanController";

// router creation with option to merge params from parent router
const planRoutes = Router({ mergeParams: true });

// controller creation
const createPlanController = new CreatePlanController();
const findAllPlansOperatorController = new FindAllPlansOperatorController();
const findPlanController = new FindPlanController();
const createPlanValuesController = new CreatePlanValuesController();
const updatePlanController = new UpdatePlanController();

// routes
/**
 * @description Create a new plan
 * @route POST /:id_operator/plans
 * @access Private
 * @group Plan - Operations about plans
 * @author Raphael Vaz
 */
planRoutes.post(
	"/",
	providedPlan,
	regexAnsRegister,
	regexReach,
	planExistsAnsRegister,
	createPlanController.handle
);

/**
 * @description Find all plans of an operator
 * @route GET /:id_operator/plans
 * @access Private
 * @group Plan - Operations about plans
 * @author Raphael Vaz
 */
planRoutes.get("/", findAllPlansOperatorController.handle);

/**
 * @description Find a plan by id
 * @route GET /:id_operator/plans/:id_plan
 * @access Private
 * @group Plan - Operations about plans
 * @author Raphael Vaz
 */
planRoutes.get("/:id_plan", planExistsId, findPlanController.handle);

/**
 * @description Create new values for a plan
 * @route POST /:id_operator/plans/:id_plan/values
 * @access Private
 * @group Plan - Operations about plans
 * @author Raphael Vaz
 */
planRoutes.post(
	"/:id_plan/values",
	planExistsId,
	planValuesExists,
	createPlanValuesController.handle
);

planRoutes.put(
	"/:id_plan",
	planExistsId,
	regexReach,
	updatePlanController.handle
);

export { planRoutes };
