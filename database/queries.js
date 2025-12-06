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

const updateUserPrivileges = async (userId, isVip, isAdmin) => {
  const result = await pool.query(
    "UPDATE users SET is_vip = $1, is_admin = $2 WHERE id = $3",
    [isVip, isAdmin, userId]
  );
  return result.rowCount > 0;
};

const insertPost = async (title, body, users_id) => {
  const result = await pool.query(
    `INSERT INTO posts (title, body, created_on, users_id) VALUES ($1, $2, NOW(), $3)`,
    [title, body, users_id]
  );

  return result.rowCount === 1;
};

const getPosts = async () => {
  const { rows } = await pool.query(
    `SELECT
       posts.*,
       users.username AS username,
       users.firstname AS firstname,
       users.lastname AS lastname
     FROM posts 
     LEFT JOIN users ON (users.id = posts.users_id)
     ORDER BY created_on DESC`
  );
  return rows;
};

const isAdminPassphraseCorrect = async (passphrase) => {
  const result = await pool.query("SELECT 1 FROM secrets WHERE admin = $1", [
    passphrase,
  ]);
  return result.rowCount === 1;
};

const isVipPassphraseCorrect = async (passphrase) => {
  const result = await pool.query("SELECT 1 FROM secrets WHERE vip = $1", [
    passphrase,
  ]);
  return result.rowCount === 1;
};

export {
  insertUser,
  getUser,
  updateUserPrivileges,
  insertPost,
  getPosts,
  isAdminPassphraseCorrect,
  isVipPassphraseCorrect,
};
