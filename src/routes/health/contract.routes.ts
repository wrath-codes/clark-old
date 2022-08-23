// libraries imports";
import { Router } from "express";

// middlewares imports
import { contractExistsNumber, contractExixtsId } from "@middlewares/existsCheck/contractExists";
import { employerExistsId } from "@middlewares/existsCheck/employerExist";
import { operatorExistsId } from "@middlewares/existsCheck/operatorExists";

// controller imports
import { CreateContractController } from "@contract/createContract/CreateContractController";
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

contractRoutes.put("/updateContractNumberDate/:id_contract",
  employerExistsId,
  contractExixtsId,
  updateContractNumberDateController.handle
);

contractRoutes.put("/endContract/:id_contract",
  employerExistsId,
  contractExixtsId,
  endContractController.handle
);


export { contractRoutes };
