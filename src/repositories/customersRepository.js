import { db } from "../database/connection.js"

const create = (name, phone, cpf) => {
  return db.query(`
    INSERT INTO customers (name, phone, cpf)
      VALUES ($1, $2, $3);
  `, [name, phone, cpf])
}

const getByCPF = (cpf) => {
  return db.query(`
    SELECT * FROM customers
      WHERE cpf = $1;
  `, [cpf])
}

const getAll = () => {
  return db.query(`
    SELECT * FROM customers;
  `)
}

const getById = (id) => {
  return db.query(`
    SELECT * FROM customers
      WHERE id = $1;
  `, [id])
}

const customersRepository = {
  create,
  getByCPF,
  getAll,
  getById
}

export default customersRepository