import { createGameService, listGames } from "../services/gamesService.js";

export const postGame = async (req, res) => {
  await createGameService(req.body);
  return res.sendStatus(201);
}

export const getGames = async (req, res) => {
  const {rows} = await listGames();
  return res.status(200).send(rows);
}