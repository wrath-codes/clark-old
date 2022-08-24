// libraries imports";
import { Router } from "express";

// middlewares imports
import { contractExistsNumber, contractExixtsId } from "@middlewares/existsCheck/contractExists";
import { employerExistsId } from "@middlewares/existsCheck/employerExist";
import { operatorExistsId } from "@middlewares/existsCheck/operatorExists";
import { contractCancelledOrExpiredCheck } from "@middlewares/miscellaneous/contractCancelledOrExpiredCheck";
import { getPlanId } from '@middlewares/miscellaneous/getPlanId';

// controller imports
import { CancelContractController } from "@contract/cancelContract/CancelContractContractController";
import { CreateContractController } from "@contract/createContract/CreateContractController";
import { CreateContractPlanDealController } from "@contract/createContractPlanDeal/CreateContractPlanDealController";
import { DeleteContractController } from "@contract/deleteContract/DeleteContractController";
import { EndContractController } from "@contract/endContract/EndContractController";
import { FindAllContractsEmployerController } from "@contract/findAllContractsEmployer/FindAllContractsEmployerController";
import { FindContractController } from "@contract/findContract/FindContractController";
import { UpdateContractNumberDateController } from "@contract/updateContractNumberDate/UpdateContractNumberDateController";

// controller declarations
const createContractController = new CreateContractController();
const findAllContractsEmployerController = new FindAllContractsEmployerController();
const findContractController = new FindContractController();
const updateContractNumberDateController = new UpdateContractNumberDateController();
const endContractController = new EndContractController();
const cancelContractController = new CancelContractController();
const deleteContractController = new DeleteContractController();
const createContractPlanDealController = new CreateContractPlanDealController();

// router definition
// extends contractRouter to be used by employerRouter
const contractRoutes = Router({ mergeParams: true });

//routes
/**
 * @route POST /:id_employer/contracts/:id_operator
 * @description Create a contract
 * @group contract - Operations about contract
 * @access Private
 * @author Raphael Vaz
 */
contractRoutes.post("/:id_operator",
  employerExistsId,
  contractExistsNumber,
  operatorExistsId,
  createContractController.handle
);

/**
 * @route GET /:id_employer/contracts/getAllContracts
 * @description Find all contracts of an employer
 * @group contract - Operations about contract
 * @access Private
 * @author Raphael Vaz
 */
contractRoutes.get("/getAllContracts",
  employerExistsId,
  findAllContractsEmployerController.handle
);

/**
 * @route GET /:id_employer/contracts/findContract/:id_contract
 * @description Find a contract
 * @group contract - Operations about contract
 * @access Private
 * @author Raphael Vaz
 */
contractRoutes.get("/findContract/:id_contract",
  employerExistsId,
  contractExixtsId,
  findContractController.handle
);

/**
 * @route PUT /:id_employer/contracts/updateContractNumberDate/:id_contract
 * @description Update a contract number and/or date
 * @group contract - Operations about contract
 * @access Private
 * @author Raphael Vaz
 */
contractRoutes.put("/updateContractNumberDate/:id_contract",
  employerExistsId,
  contractExixtsId,
  updateContractNumberDateController.handle
);

/**
 * @route PUT /:id_employer/contracts/endContract/:id_contract
 * @description End a contract
 * @group contract - Operations about contract
 * @access Private
 * @author Raphael Vaz
 */
contractRoutes.put("/endContract/:id_contract",
  employerExistsId,
  contractExixtsId,
  contractCancelledOrExpiredCheck,
  endContractController.handle
);

/**
 * @route PUT /:id_employer/contracts/cancelContract/:id_contract
 * @description Cancel a contract
 * @group contract - Operations about contract
 * @access Private
 * @author Raphael Vaz
 */
contractRoutes.put("/cancelContract/:id_contract",
  employerExistsId,
  contractExixtsId,
  contractCancelledOrExpiredCheck,
  cancelContractController.handle
);

/**
 * @route DELETE /:id_employer/contracts/deleteContract/:id_contract
 * @description Delete a contract
 * @group contract - Operations about contract
 * @access Private
 * @author Raphael Vaz
 */
contractRoutes.delete("/deleteContract/:id_contract",
  employerExistsId,
  contractExixtsId,
  deleteContractController.handle
);

/**
 * 
 */
contractRoutes.post("/planDeal/:id_contract/createPlanDeal",
  employerExistsId,
  contractExixtsId,
  getPlanId,
  createContractPlanDealController.handle
);

export { contractRoutes };
