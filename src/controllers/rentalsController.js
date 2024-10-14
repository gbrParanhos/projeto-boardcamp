import { createRentalService, deleteRentalById, listRentals, returnRentalById } from "../services/rentalsService.js";

export const postRental = async (req, res) => {
  await createRentalService(req.body);
  return res.sendStatus(201);
}

export const getRentals = async (req, res) => {
  const result = await listRentals();
  return res.status(200).send(result);
}

export const postReturnRental = async (req, res) => {
  await returnRentalById(req.params);
  return res.sendStatus(200);
}

export const deleteRental = async (req, res) => {
  await deleteRentalById(req.params);
  return res.sendStatus(200);
}