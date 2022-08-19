// import libraries
import { Router } from "express";
import multer from "multer";

// import middlewares
import {
	planExistsAnsRegister,
	planExistsId,
} from "@middlewares/existsCheck/planExists";
import { providedPlan } from "@middlewares/providedCheck/providedPlan";
import { regexAnsRegister } from "@middlewares/regexCheck/regexAnsRegister";
import { regexReach } from "@middlewares/regexCheck/regexReach";
import { providedReachUpdate } from "./../../../middlewares/providedCheck/providedReachUpdate";

// import controllers
import { operatorPlansCheck } from "@middlewares/existsCheck/operatorPlansCheck";
import { CreatePlanController } from "@plan/createPlan/CreatePlanController";
import { DeleteAllPlansOperatorController } from "@plan/deleteAllPlansOperator/DeleteAllPlansOperatorController";
import { DeletePlanController } from "@plan/deletePlan/DeletePlanController";
import { FindAllPlansOperatorController } from "@plan/findAllPlansOperator/FindAllPlansOperatorController";
import { FindPlanController } from "@plan/findPlan/FindPlanController";
import { ImportPlansController } from "@plan/importPlans/ImportPlansController";
import { UpdatePlanController } from "@plan/updatePlan/UpdatePlanController";

// router creation with option to merge params from parent router
const planRoutes = Router({ mergeParams: true });
// upload folder definition
const upload = multer({
	dest: "./tmp",
});

// controller creation
const createPlanController = new CreatePlanController();
const findAllPlansOperatorController = new FindAllPlansOperatorController();
const findPlanController = new FindPlanController();
const updatePlanController = new UpdatePlanController();
const deletePlanController = new DeletePlanController();
const deleteAllPlansOperatorController = new DeleteAllPlansOperatorController();
const importPlansController = new ImportPlansController();

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
 * @description Delete a plan
 * @route DELETE /:id_operator/plans/:id_plan
 * @access Private
 * @group Plan - Operations about plans
 * @author Raphael Vaz
 */
planRoutes.delete("/:id_plan", planExistsId, deletePlanController.handle);

/**
 * @description Delete all plans of an operator
 * @route DELETE /:id_operator/plans
 * @access Private
 * @group Plan - Operations about plans
 * @author Raphael Vaz
 */
planRoutes.delete(
	"/",
	operatorPlansCheck,
	deleteAllPlansOperatorController.handle
);

planRoutes.post("/import", upload.single("file"), importPlansController.handle);

export { planRoutes };
