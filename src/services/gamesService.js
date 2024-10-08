import { conflictError } from "../errors/errors.js";
import gamesRepository from "../repositories/gamesRepository.js";

export const createGameService = async ({name, image, stockTotal, pricePerDay}) => {
  const gameSameName = await gamesRepository.getByName(name)
  if (gameSameName.rowCount !== 0) throw conflictError('jogo','nome')
  const result = gamesRepository.create(name, image, stockTotal, pricePerDay);
  return result
}

export const listGames = () => {
  const result = gamesRepository.getAll();
  return result
}