import { User } from "./modules/User/User.model";

async function inicializar() {
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
  // const user = await User.create({ name: "John Doe", email: "john@gmail.com" });
}

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