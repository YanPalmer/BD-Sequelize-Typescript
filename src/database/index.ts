import { Sequelize } from "sequelize";

// Configurações do banco de dados postgres
export const sequelize = new Sequelize({
  dialect: "postgres",
  database: "softex",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  logging: false,
});
