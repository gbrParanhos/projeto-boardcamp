import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { gamesSchema } from "../schemas/gamesSchema.js";
import { getGames, postGame } from "../controllers/gamesController.js";

const gamesRouter = Router();

gamesRouter.post('/games', validateSchema(gamesSchema), postGame);
gamesRouter.get('/games', getGames);

export default gamesRouter;