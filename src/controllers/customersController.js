import { createCustomersService, listCustomers, searchCustomerById } from "../services/customersService.js";

export const postCustomers = async (req, res) => {
  await createCustomersService(req.body);
  return res.sendStatus(201);
}

export const getCustomers = async (req, res) => {
  const {rows} = await listCustomers();
  return res.status(200).send(rows);
}

export const getCustomerById = async (req, res) => {
  const {rows} = await searchCustomerById(req.params);
  return res.status(200).send(rows[0]);
}