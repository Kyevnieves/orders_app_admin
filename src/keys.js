const { config } = require("dotenv");
config();

const DB_HOST = process.env.DB_HOST || process.env.DB_LOCAL_HOST;
const DB_USER = process.env.DB_USER || process.env.DB_LOCAL_USER;
const DB_PASSWORD = process.env.DB_PASSWORD || process.env.DB_LOCAL_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE || process.env.DB_LOCAL_DATABASE;

module.exports = {
  database: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  },
};
