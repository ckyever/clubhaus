import { pool } from "./pool.js";

async function insertUser(username, password, firstname, lastname) {
  await pool.query(
    `INSERT INTO users (
      username,
      password,
      firstname,
      lastname,
      is_vip,
      is_admin,
      created_on
    ) VALUES ($1, $2, $3, $4, FALSE, FALSE, NOW())`,
    [username, password, firstname, lastname]
  );
}

export { insertUser };
