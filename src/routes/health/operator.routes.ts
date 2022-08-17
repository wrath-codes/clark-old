// libraries imports
import { Router } from "express";
import multer from "multer";

// middlewares imports
import { getCnpjJaInfoOperator } from "@middlewares/consult/getCnpjJaInfoOperator";
import { getCnpjJaToken } from "@middlewares/consult/getCnpjJaToken";
import { operatorAddressCheck } from "@middlewares/existsCheck/operatorAddressCheck";
import { operatorContactCheck } from "@middlewares/existsCheck/operatorContactCheck";
import {
	operatorExistsCNPJ,
	operatorExistsId,
} from "@middlewares/existsCheck/operatorExists";
import { operatorLoginCheck } from "@middlewares/existsCheck/operatorLoginCheck";
import { operatorContactInUse } from "@middlewares/isInUse/contactInUse";
import { providedAdress } from "@middlewares/providedCheck/providedAddress";
import { providedContact } from "@middlewares/providedCheck/providedContact";
import { providedLogin } from "@middlewares/providedCheck/providedLogin";
import { providedOperator } from "@middlewares/providedCheck/providedOperator";
import { regexCellphone } from "@middlewares/regexCheck/regexCellphone";
import { regexCNPJ } from "@middlewares/regexCheck/regexCNPJ";
import { regexEmail } from "@middlewares/regexCheck/regexEmail";
import { regexWebsite } from "@middlewares/regexCheck/regexWebsite";
import { regexZipCode } from "@middlewares/regexCheck/regexZipcode";

// controller imports
import { CreateOperatorController } from "@operator/createOperator/CreateOperatorController";
import { CreateOperatorAddressController } from "@operator/createOperatorAdress/CreateOperatorAddressController";
import { CreateOperatorLoginController } from "@operator/createOperatorLogin/CreateOperatorLoginControler";
import { DeleteOperatorController } from "@operator/deleteOperator/deleteOperatorController";
import { DeleteOperatorContactController } from "@operator/deleteOperatorContact/DeleteOperatorContactController";
import { DeleteOperatorLoginController } from "@operator/delteOperatorLogin/DeleteOperatorLoginController";
import { FindAllOperatorsController } from "@operator/findAllOperators/FindAllOperatorsController";
import { FindOperatorController } from "@operator/findOperator/FindOperatorController";
import { ImportOperatorsController } from "@operator/importOperators/ImportOperatorsController";
import { UpdateOperatorContactController } from "@operator/updateOperatorContact/UpdateOperatorContactController";
import { UpdateOperatorLoginController } from "@operator/updateOperatorLogin/UpdateOperatorLoginController";
import { CreateOperatorContactController } from "./../../modules/health/operator/useCases/createOperatorContact/CreateOperatorContactController";

// controller declarations
const createOperatorController = new CreateOperatorController();
const findOperatorController = new FindOperatorController();
const createOperatorAddressController = new CreateOperatorAddressController();
const createOperatorContactController = new CreateOperatorContactController();
const createOperatorLoginController = new CreateOperatorLoginController();
const importOperatorsController = new ImportOperatorsController();
const findAllOperatorsController = new FindAllOperatorsController();
const updateOperatorLoginController = new UpdateOperatorLoginController();
const updateOperatorContactController = new UpdateOperatorContactController();
const deleteOperatorController = new DeleteOperatorController();
const deleteOperatorContactController = new DeleteOperatorContactController();
const deleteOperatorLoginController = new DeleteOperatorLoginController();

// router definition
const operatorRoutes = Router();
// upload folder definition
const upload = multer({
	dest: "./tmp",
});

/**
 * @router POST /operators
 * @description Create a new operator
 * @access Public
 * @body cnpj: string - cnpj of the operator
 * @body website: string - website of the operator
 * @returns {object} - operator created
 */
operatorRoutes.post(
	"/",
	providedOperator,
	regexWebsite,
	regexCNPJ,
	operatorExistsCNPJ,
	getCnpjJaToken,
	getCnpjJaInfoOperator,
	createOperatorController.handle
);

/**
 * @router POST /operators/createAddress/:id_operator
 * @description Create an address for an operator
 * @access Public
 * @params id_operator: string - id of the operator
 * @body street: string - street of the address
 * @body number: number - number of the address
 * @body complement: string - complement of the address
 * @body city: string - city of the address
 * @body state: string - state of the address
 * @body country: string - country of the address
 * @body zipCode: string - zipCode of the address
 * @returns {object} - operator with address created
 */
operatorRoutes.post(
	"/createAddress/:id_operator",
	providedAdress,
	regexZipCode,
	operatorAddressCheck,
	createOperatorAddressController.handle
);

/**
 * @router POST /operators/createContact/:id_operator
 * @description Create a contact for an operator
 * @access Public
 * @params id_operator: string - id of the operator
 * @body firstName: string - first name of the contact
 * @body lastName: string - last name of the contact
 * @body email: string - email of the contact
 * @body cellphone: string - cellphone of the contact
 * @returns {object} - operator with contact created
 */
operatorRoutes.post(
	"/createContact/:id_operator",
	providedContact,
	regexEmail,
	regexCellphone,
	operatorContactInUse,
	operatorContactCheck,
	operatorExistsId,
	createOperatorContactController.handle
);

/**
 * @router POST /operators/createLogin/:id_operator
 * @description Create a login for an operator
 * @access Public
 * @params id_operator: string - id of the operator
 * @body username: string - username of the login
 * @body password: string - password of the login
 * @returns {object} - operator with login created
 */
operatorRoutes.post(
	"/createLogin/:id_operator",
	providedLogin,
	operatorLoginCheck,
	operatorExistsId,
	createOperatorLoginController.handle
);

operatorRoutes.post(
	"/import",
	getCnpjJaToken,
	upload.single("file"),
	importOperatorsController.handle
);

/**
 * @router GET /operators/:id_operator
 * @description Find an operator by id
 * @access Public
 * @params id_operator: string - id of the operator
 * @returns {object} - operator found
 */
operatorRoutes.get(
	"/:id_operator",
	operatorExistsId,
	findOperatorController.handle
);

/**
 * @router GET /operators
 * @description Find all operators
 * @access Public
 * @returns {object} - all operators found
 */
operatorRoutes.get("/", findAllOperatorsController.handle);

/**
 * @router PUT /operators/updateLogin/:id_operator
 * @description Update a login for an operator
 * @access Public
 * @params id_operator: string - id of the operator
 * @body username: string - username of the login
 * @body password: string - password of the login
 * @returns {object} - operator with login updated
 */
operatorRoutes.put(
	"/updateLogin/:id_operator",
	operatorExistsId,
	updateOperatorLoginController.handle
);

/**
 * @router PUT /operators/updateContact/:id_operator
 * @description Update a contact for an operator
 * @access Public
 * @params id_operator: string - id of the operator
 * @body firstName: string - first name of the contact
 * @body lastName: string - last name of the contact
 * @body email: string - email of the contact
 * @body cellphone: string - cellphone of the contact
 * @returns {object} - operator with contact updated
 */
operatorRoutes.put(
	"/updateContact/:id_operator",
	operatorExistsId,
	updateOperatorContactController.handle
);

/**
 * @router DELETE /operators/:id_operator
 * @description Delete an operator by id
 * @access Public
 * @params id_operator: string - id of the operator
 * @returns message: string - operator deleted successfully
 */
operatorRoutes.delete(
	"/:id_operator",
	operatorExistsId,
	deleteOperatorController.handle
);

/**
 * @router DELETE /operators/deleteContact/:id_operator
 * @description Delete a contact for an operator
 * @access Public
 * @params id_operator: string - id of the operator
 * @returns message: string - operator with contact deleted successfully
 */
operatorRoutes.delete(
	"/deleteContact/:id_operator",
	operatorExistsId,
	deleteOperatorContactController.handle
);

/**
 * @router DELETE /operators/deleteLogin/:id_operator
 * @description Delete a login for an operator
 * @access Public
 * @params id_operator: string - id of the operator
 * @returns message: string - operator with login deleted successfully
 */
operatorRoutes.delete(
	"/deleteLogin/:id_operator",
	operatorExistsId,
	deleteOperatorLoginController.handle
);

export { operatorRoutes };
