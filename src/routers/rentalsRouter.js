import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { postRentalSchema } from "../schemas/rentalsSchema.js";
import { deleteRental, getRentals, postRental, postReturnRental } from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.post('/rentals', validateSchema(postRentalSchema), postRental);
rentalsRouter.post('/rentals/:id/return', postReturnRental);
rentalsRouter.delete('/rentals/:id', deleteRental);
rentalsRouter.get('/rentals', getRentals);

export default rentalsRouter;