// import libraries
import { Router } from "express";

// import middlewares
import {
	planExistsAnsRegister,
	planExistsId,
} from "@middlewares/existsCheck/planExists";
import {
	planValuesExists,
	planValuesExistsDeleteUpdate,
} from "@middlewares/existsCheck/planValuesExists";
import { providedPlan } from "@middlewares/providedCheck/providedPlan";
import { regexAnsRegister } from "@middlewares/regexCheck/regexAnsRegister";
import { regexReach } from "@middlewares/regexCheck/regexReach";
import { providedReachUpdate } from "./../../../middlewares/providedCheck/providedReachUpdate";

// import controllers
import { operatorPlansCheck } from "@middlewares/existsCheck/operatorPlansCheck";
import { CreatePlanController } from "@plan/createPlan/CreatePlanController";
import { CreatePlanValuesController } from "@plan/createPlanValues/CreatePlanValuesController";
import { DeleteAllPlansOperatorController } from "@plan/deleteAllPlansOperator/DeleteAllPlansOperatorController";
import { DeletePlanController } from "@plan/deletePlan/DeletePlanController";
import { DeletePlanValuesController } from "@plan/deletePlanValues/DeletePlanValuesController";
import { FindAllPlansOperatorController } from "@plan/findAllPlansOperator/FindAllPlansOperatorController";
import { FindPlanController } from "@plan/findPlan/FindPlanController";
import { UpdatePlanController } from "@plan/updatePlan/UpdatePlanController";
import { UpdatePlanValuesController } from "@plan/updatePlanValues/UpdatePlanValuesController";

// router creation with option to merge params from parent router
const planRoutes = Router({ mergeParams: true });

// controller creation
const createPlanController = new CreatePlanController();
const findAllPlansOperatorController = new FindAllPlansOperatorController();
const findPlanController = new FindPlanController();
const createPlanValuesController = new CreatePlanValuesController();
const updatePlanController = new UpdatePlanController();
const updatePlanValuesController = new UpdatePlanValuesController();
const deletePlanValuesController = new DeletePlanValuesController();
const deletePlanController = new DeletePlanController();
const deleteAllPlansOperatorController = new DeleteAllPlansOperatorController();

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

/**
 * @description Update a plan basic information
 * @route PUT /:id_operator/plans/:id_plan
 * @access Private
 * @group Plan - Operations about plans
 * @author Raphael Vaz
 */
planRoutes.put(
	"/:id_plan",
	planExistsId,
	providedReachUpdate,
	updatePlanController.handle
);

/**
 * @description Update a plan values
 * @route PUT /:id_operator/plans/:id_plan/values
 * @access Private
 * @group Plan - Operations about plans
 * @author Raphael Vaz
 */
planRoutes.put(
	"/:id_plan/values",
	planExistsId,
	planValuesExistsDeleteUpdate,
	updatePlanValuesController.handle
);

/**
 * @description Delete a plan
 * @route DELETE /:id_operator/plans/:id_plan
 * @access Private
 * @group Plan - Operations about plans
 * @author Raphael Vaz
 */
planRoutes.delete("/:id_plan", planExistsId, deletePlanController.handle);

/**
 * @description Delete a plan values
 * @route DELETE /:id_operator/plans/:id_plan/values
 * @access Private
 * @group Plan - Operations about plans
 * @author Raphael Vaz
 */
planRoutes.delete(
	"/:id_plan/values",
	planExistsId,
	planValuesExistsDeleteUpdate,
	deletePlanValuesController.handle
);

planRoutes.delete(
	"/",
	operatorPlansCheck,
	deleteAllPlansOperatorController.handle
);

export { planRoutes };
