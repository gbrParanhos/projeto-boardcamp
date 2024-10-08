import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { customersSchema } from "../schemas/customersSchema.js";
import { getCustomers, postCustomers } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.post('/customers', validateSchema(customersSchema), postCustomers);
customersRouter.get('/customers', getCustomers);

export default customersRouter;