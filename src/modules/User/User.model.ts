import { DataTypes } from "sequelize";
import { sequelize } from "../../database";

// Criando e exportando um MODELO definido como "User" utilizando as configurações do banco de dados
export const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: DataTypes.STRING,
});
