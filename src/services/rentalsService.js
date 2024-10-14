import { noStock, notClose, notFoundError, notOpen } from "../errors/errors.js";
import customersRepository from "../repositories/customersRepository.js";
import gamesRepository from "../repositories/gamesRepository.js";
import rentalsRepository from "../repositories/rentalsRepository.js";

export const createRentalService = async ({customerId, gameId, daysRented}) => {
  const game = await gamesRepository.getById(gameId);
  if (game.rowCount === 0) throw notFoundError('jogo','id');

  const customer = await customersRepository.getById(customerId);
  if (customer.rowCount === 0) throw notFoundError('cliente','id');

  const currentRentals = await rentalsRepository.getCurrentRentals(gameId);
  if (!(currentRentals.rows[0].stockTotal > Number(currentRentals.rows[0].rentalsTotal))) throw noStock();

  const result = rentalsRepository.create(customerId, gameId, daysRented);
  return result
}

export const listRentals = async () => {
  const rentalsList = await rentalsRepository.getAll();
  const result = rentalsList.rows.map(row => {
    return {
      ...row,
      customer: {id: row.customerId, name: row.customer},
      game: {id: row.gameId, name: row.game}
    }
  })
  return result
}

export const returnRentalById = async ({id}) => {
  const rental = await rentalsRepository.getById(id);
  if (rental.rowCount === 0) throw notFoundError('aluguel','id');
  if (rental.rows[0].returnDate) throw notOpen();

  const result = rentalsRepository.returnRental(id, rental.rows[0].gameId)
  return result
}

export const deleteRentalById = async ({id}) => {
  const rental = await rentalsRepository.getById(id);
  if (rental.rowCount === 0) throw notFoundError('aluguel','id');
  if (!rental.rows[0].returnDate) throw notClose();

  const result = rentalsRepository.deleteById(id)
  return result
}