#! /usr/bin/env node

import "dotenv/config";
import { Client } from "pg";

const SQL = `
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS session;
DROP TABLE IF EXISTS secrets;
`;

async function main() {
  console.log("Cleaning database...");
  const client = new Client({
    connectionString: process.env.DATABASE_CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

main();
