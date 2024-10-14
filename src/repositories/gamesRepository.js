import { db } from "../database/connection.js";

const create = (name, image, stockTotal, pricePerDay) => {
  return db.query(`
    INSERT INTO games (name, image, "stockTotal", "pricePerDay")
      VALUES ($1, $2, $3, $4);
  `, [name, image, stockTotal, pricePerDay])
}

const getByName = (name) => {
  return db.query(`
    SELECT * FROM games
      WHERE name = $1;
  `, [name])
}

const getById = (id) => {
  return db.query(`
    SELECT * FROM games
      WHERE id = $1;
  `, [id])
}

const getAll = () => {
  return db.query(`
    SELECT * FROM games;
  `)
}

const gamesRepository = {
  create,
  getByName,
  getById,
  getAll
}

export default gamesRepository