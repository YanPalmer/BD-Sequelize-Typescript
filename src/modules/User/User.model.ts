import { DataTypes } from "sequelize";
import { sequelize } from "../../database";

// Criando e exportando um MODELO definido como "User" utilizando as configurações do banco de dados
export const User = sequelize.define("User", {
  // id: {
  //   type: DataTypes.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true,
  // },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
});
