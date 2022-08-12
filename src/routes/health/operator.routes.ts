// libraries imports
import { Router } from "express";
import multer from "multer";

// middlewares imports
import { operatorContactCheck } from "@middlewares/existsCheck/operatorContactCheck";
import {
	operatorExistsCNPJ,
	operatorExistsId,
} from "@middlewares/existsCheck/operatorExists";
import { providedContact } from "@middlewares/providedCheck/providedContact";
import { providedLogin } from "@middlewares/providedCheck/providedLogin";
import { providedOperator } from "@middlewares/providedCheck/providedOperator";
import { regexCNPJ } from "@middlewares/regexCheck/regexCNPJ";
import { regexEmail } from "@middlewares/regexCheck/regexEmail";
import { regexWebsite } from "@middlewares/regexCheck/regexWebsite";
import { regexCellphone } from "./../../middlewares/regexCheck/regexCellphone";

// controller imports
import { operatorAddressCheck } from "@middlewares/existsCheck/operatorAddressCheck";
import { operatorLoginCheck } from "@middlewares/existsCheck/operatorLoginCheck";
import { providedAdress } from "@middlewares/providedCheck/providedAddress";
import { regexZipCode } from "@middlewares/regexCheck/regexZipcode";
import { CreateOperatorController } from "@operator/createOperator/CreateOperatorController";
import { CreateOperatorAddressController } from "@operator/createOperatorAdress/CreateOperatorAddressController";
import { CreateOperatorLoginController } from "@operator/createOperatorLogin/CreateOperatorLoginControler";
import { FindOperatorController } from "@operator/findOperator/FindOperatorController";
import { ImportOperatorsController } from "@operator/importOperators/ImportOperatorsController";
import { CreateOperatorContactController } from "./../../modules/health/operator/useCases/createOperatorContact/CreateOperatorContactController";

// controller declarations
const createOperatorController = new CreateOperatorController();
const findOperatorController = new FindOperatorController();
const createOperatorAddressController = new CreateOperatorAddressController();
const createOperatorContactController = new CreateOperatorContactController();
const createOperatorLoginController = new CreateOperatorLoginController();
const importOperatorsController = new ImportOperatorsController();

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
 * @body name: string - name of the operator
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

export { operatorRoutes };
