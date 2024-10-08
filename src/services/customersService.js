import { conflictError, notFoundError } from "../errors/errors.js";
import customersRepository from "../repositories/customersRepository.js";


export const createCustomersService = async ({name, phone, cpf}) => {
  const customersSameCPF = await customersRepository.getByCPF(cpf);
  if (customersSameCPF.rowCount !== 0) throw conflictError('cliente','cpf');
  const result = customersRepository.create(name, phone, cpf);
  return result
}

export const listCustomers = () => {
  const result = customersRepository.getAll();
  return result
}

export const searchCustomerById = async ({id}) => {
  const result = await customersRepository.getById(id);
  if (result.rowCount === 0) throw notFoundError('cliente','id')
  return result
}