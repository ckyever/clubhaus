#! /usr/bin/env node

import "dotenv/config";
import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  is_vip BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_on TIMESTAMP WITH TIME ZONE NOT NULL,
  last_login TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  body TEXT,
  created_on TIMESTAMP WITH TIME ZONE NOT NULL,
  users_id INTEGER REFERENCES users(id) NOT NULL
);
`;

async function main() {
  console.log("Populating database...");
  const client = new Client({
    connectionString: process.env.DATABASE_CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

main();
