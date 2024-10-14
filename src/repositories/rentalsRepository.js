import { db } from "../database/connection.js";

const create = (customerId, gameId, daysRented) => {
  return db.query(`
    INSERT INTO rentals (
      "customerId", 
      "gameId", 
      "rentDate", 
      "daysRented", 
      "originalPrice"
    ) 
    VALUES (
      $1, 
      $2, 
      CURRENT_DATE, 
      $3, 
      $3 * (
        SELECT "pricePerDay" 
        FROM games 
        WHERE games.id = $2
      )
    );
  `, [customerId, gameId, daysRented])
}

const getById = (id) => {
  return db.query(`
    SELECT * FROM rentals
      WHERE id = $1;
  `, [id])
}

const getCurrentRentals = (gameId) => {
  return db.query(`
    SELECT games."stockTotal", COUNT(rentals.id) AS "rentalsTotal" FROM games
	    LEFT JOIN rentals ON games.id = rentals."gameId"
	    WHERE rentals."returnDate" IS null AND games.id = $1
	    GROUP BY games.id
  `, [gameId])
}

const getAll = () => {
  return db.query(`
    SELECT 
      rentals.id, 
      rentals."customerId", 
      rentals."gameId", 
      TO_CHAR(rentals."rentDate", 'YYYY-MM-DD') AS "rentDate", 
      rentals."daysRented", 
      TO_CHAR(rentals."returnDate", 'YYYY-MM-DD') AS "returnDate", 
      rentals."originalPrice", 
      rentals."delayFee", 
      customers.name AS customer, 
      games.name AS game
    FROM rentals
    JOIN games ON rentals."gameId" = games.id
    JOIN customers ON rentals."customerId" = customers.id;
  `)
}

const returnRental = (id, gameId) => {
  return db.query(`
    UPDATE rentals
      SET
        "returnDate" = CURRENT_DATE,
        "delayFee" = GREATEST(0,((CURRENT_DATE - (
          SELECT "rentDate"
          FROM rentals
          WHERE id = $1
        )) - (
          SELECT "daysRented"
          FROM rentals
          WHERE id = $1
        ))) * (
          SELECT "pricePerDay" 
          FROM games 
          WHERE games.id = $2
        )
      WHERE id = $1;
  `, [id, gameId])
}

const deleteById = (id) => {
  return db.query(`
    DELETE FROM rentals
      WHERE id = $1;
  `, [id])
}

const rentalsRepository = {
  create,
  getById,
  getCurrentRentals,
  getAll,
  returnRental,
  deleteById
}

export default rentalsRepository