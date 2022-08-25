import { Router } from "express";

// middlewares
import { getCnpjJaInfo } from "@middlewares/consult/getCnpjJaInfo";
import { getCnpjJaToken } from "@middlewares/consult/getCnpjJaToken";
import { brokerExistsCNPJ, brokerExistsId } from "@middlewares/existsCheck/brokerExists";
import { providedCNPJ } from "@middlewares/providedCheck/providedCNPJ";
import { regexCNPJ } from "@middlewares/regexCheck/regexCNPJ";

// controllers imports
import { ChangeBrokerNameController } from "@broker/changeBrokerName/ChangeBrokerNameController";
import { CreateBrokerController } from "@broker/createBroker/CreateBrokerController";
import { DeleteBrokerController } from "@broker/deleteBroker/DeleteBrokerController";
import { FindAllBrokersController } from "@broker/findAllBrokers/FindAllBrokersController";
import { FindBrokerController } from "@broker/findBroker/FindBrokerController";

// controller declarations
const createBrokerController = new CreateBrokerController();
const findAllBrokersController = new FindAllBrokersController();
const findBrokerController = new FindBrokerController();
const deleteBrokerController = new DeleteBrokerController();
const changeBrokerNameController = new ChangeBrokerNameController();

// router definition
const brokerRoutes = Router();

// routes

/**
 * @route POST /brokers
 * @group Broker - Operations about brokers
 * @access Private
 * @body cnpj: string - cnpj of the broker
 * @returns {object} - broker created
 * @author Raphael Vaz
 */
brokerRoutes.post(
  "/",
  providedCNPJ,
  regexCNPJ,
  brokerExistsCNPJ,
  getCnpjJaToken,
  getCnpjJaInfo,
  createBrokerController.handle
);

/**
 * @route GET /brokers
 * @group Broker - Operations about brokers
 * @access Private
 * @returns {object} - all brokers
 * @author Raphael Vaz
 */
brokerRoutes.get("/", findAllBrokersController.handle);

/**
 * @route GET /brokers/:id_broker
 * @group Broker - Operations about brokers
 * @access Private
 * @returns {object} - broker found found
 * @author Raphael Vaz
 */
brokerRoutes.get("/:id_broker", brokerExistsId, findBrokerController.handle);

/**
 * @route DELETE /brokers/:id_broker
 * @group Broker - Operations about brokers
 * @access Private
 * @returns {object} - message of success
 * @author Raphael Vaz
 */
brokerRoutes.delete("/:id_broker", brokerExistsId, deleteBrokerController.handle);

/**
 * @route PUT /brokers/:id_broker
 * @group Broker - Operations about brokers
 * @access Private
 * @returns {object} - updated broker
 * @author Raphael Vaz
 */
brokerRoutes.put("/:id_broker", brokerExistsId, changeBrokerNameController.handle);

export { brokerRoutes };
