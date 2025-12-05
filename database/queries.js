import { pool } from "./pool.js";

const insertUser = async (username, password, firstname, lastname) => {
  const { rows } = await pool.query(
    `INSERT INTO users (
      username,
      password,
      firstname,
      lastname,
      is_vip,
      is_admin,
      created_on
    ) VALUES ($1, $2, $3, $4, FALSE, FALSE, NOW())
    RETURNING *`,
    [username, password, firstname, lastname]
  );
  return rows[0] ?? null;
};

const getUser = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
};

export { insertUser, getUser };
