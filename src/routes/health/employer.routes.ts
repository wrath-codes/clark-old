// libraries imports
import { Router } from "express";

// middlewares imports
import { getCnpjJaInfo } from "@middlewares/consult/getCnpjJaInfo";
import { getCnpjJaToken } from "@middlewares/consult/getCnpjJaToken";
import { employerExistsCNPJ, employerExistsId } from "@middlewares/existsCheck/employerExist";
import { providedCNPJ } from "@middlewares/providedCheck/providedCNPJ";
import { regexCNPJ } from "@middlewares/regexCheck/regexCNPJ";

// import routers
import { contractRoutes } from "./contract.routes";

// controller imports
import { AssignBrokerToEmployerController } from "@employer/assignBrokerToEmployer/AssignBrokerToEmployerController";
import { ChangeEmployerNameController } from "@employer/changeEmployerName/ChangeEmployerNameController";
import { CreateEmployerController } from "@employer/createEmployer/CreateEmployerController";
import { DeleteEmployerController } from "@employer/deleteEmployer/DeleteEmployerController";
import { FindAllEmployersController } from "@employer/findAllEmployers/FindAllEmployersController";
import { FindEmployerController } from "@employer/findEmployer/FindEmployerController";
import { brokerExistsId } from "@middlewares/existsCheck/brokerExists";

// controller declarations
const createEmployerController = new CreateEmployerController();
const findEmployerController = new FindEmployerController();
const findAllEmployersController = new FindAllEmployersController();
const deleteEmployerController = new DeleteEmployerController();
const changeEmployerNameController = new ChangeEmployerNameController();
const assignBrokerToEmployerController = new AssignBrokerToEmployerController();

// router definition
const employerRoutes = Router();
employerRoutes.use("/:id_employer/contracts", contractRoutes);
//routes
/**
 * @route POST /employer
 * @description Create an employer
 * @group employer - Operations about employer
 * @access Private
 * @author Raphael Vaz
 */
employerRoutes.post("/",
  providedCNPJ,
  regexCNPJ,
  employerExistsCNPJ,
  getCnpjJaToken,
  getCnpjJaInfo,
  createEmployerController.handle
);

/**
 * @route GET /employer/
 * @description Find all employers
 * @group Employer - Operations about employer
 * @access Private
 * @author Raphael Vaz
 */
employerRoutes.get("/", findAllEmployersController.handle);  

/**
 * @route GET /employers/:id_employer
 * @description Find employer by id
 * @group Employer - Operations about employer
 * @access Private
 * @author Raphael Vaz
 */
employerRoutes.get("/:id_employer",
  employerExistsId,
  findEmployerController.handle
);


/**
 * @route DELETE /employers/:id_employer
 * @description Delete employer by id
 * @group Employer - Operations about employer
 * @access Private
 * @author Raphael Vaz
 */
employerRoutes.delete("/:id_employer",
  employerExistsId,
  deleteEmployerController.handle
);

/**
 * @route PUT /employers/:id_employer
 * @description Change employer name by id
 * @group Employer - Operations about employer
 * @access Private
 * @author Raphael Vaz
 */
employerRoutes.put("/:id_employer",
  employerExistsId,
  changeEmployerNameController.handle
);

employerRoutes.put("/:id_employer/assignBroker/:id_broker",
  employerExistsId,
  brokerExistsId,
  assignBrokerToEmployerController.handle
);

export { employerRoutes };
