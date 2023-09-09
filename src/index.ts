import { DBmanager } from "./functions/DBmanager";

export const prompt = require("prompt-sync")();

export function inicializar() {
  console.log("===================================================================");
  console.log("Bem vindo ao banco de dados!");
  console.log("Aqui você pode adicionar, procurar e excluir valores do nosso banco");
  console.log(`
  1 - Inserir dados
  2 - Procurar dados
  3 - Excluir dados
  4 - Mostrar tabela
  `);
  const entrada = parseInt(prompt("Digite a opção escolhida: "));
  switch (entrada) {
    case 1:
      DBmanager(1);
      break;
    case 2:
      DBmanager(2);
      break;
    case 3:
      DBmanager(3);
      break;
    case 4:
      DBmanager(4);
      break;
    default:
      break;
  }
}
// DBmanager();
inicializar();





/*  Funciona!
async function inicializar() {
  const user = User.build(
    {name: "teste", email: "yanpalmer007@gmail.com"}
  );
  console.log(user instanceof User);
  console.log(user.dataValues.name);
  await user.save();
  
  // Sincroniza este modelo com o banco de dados, ou seja, cria a tabela
  await User.sync();
  const users = await User.findAll();
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    console.log(
      user.dataValues.id,
      user.dataValues.name,
      user.dataValues.email
    );
  }
}
*/