import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  database: "softex",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  logging: false,
});
