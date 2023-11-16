import { sequelize } from "./database"


async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log('Conexão funcionando!');
  } catch (error) {
    console.log('Erro na conexão!', error);
  }
}

authenticate();