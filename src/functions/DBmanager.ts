import { inicializar, prompt } from "..";
import { User } from "../modules/User/User.model";

export async function DBmanager(execucao: number) {
    // await User.drop(); Exclui os dados da tabela INTEIRA
    // const user = await User.create({ name: "Yan Doe", email: "john@gmail.com" });
    await User.sync();

    async function inserirDados() {
        const entradaNome = String(prompt("Digite seu nome: "));
        const entradaEmail = prompt("Digite seu email: ");
        await User.findOne({
            where: {
                email: entradaEmail
            }
        })
        .then(async (email) => {
            // Caso não exista
            if (!email) {
                try {
                    await User.create({
                        name: entradaNome,
                        email: entradaEmail
                    });
                    console.log(`Usuário ${entradaNome} adicionado com sucesso!`);
                } catch (error) {
                    console.error("Erro inesperado!");
                }
            } else {
                console.error("Email já existente!");
            }
        })
        console.log("Sincronizando...");
        reinicializar();
    }

    async function procurarDados() {
        console.log("Procurar dados...");
        const dadoEmail = String(prompt("Digite o Email: "));
        await buscarUsuario(dadoEmail);

        console.log("Sincronizando...");
        reinicializar();
    }

    async function excluirDados() {
        let email: string = prompt("Email a ser excluído: ");
        const usuarioEncontrado = await buscarUsuario(email);
        // console.log(usuarioEncontrado);

        if (usuarioEncontrado) {
            // console.log(usuarioEncontrado.dataValues.id);
            let confirmacao = prompt("Deseja mesmo excluir (S/N)? ").toLowerCase();
            if (confirmacao === "s") {
                await User.destroy({
                    where: {
                        id: usuarioEncontrado.dataValues.id,
                    },
                })
                .then((destruido) => console.log("Usuário excluído com sucesso!"))
                .catch((error) => {
                    console.error("Erro ao excluir usuário: ", error);
                })
            } else {
                console.log("Operação cancelada")
            }
        }
        console.log("Sincronizando...");
        reinicializar();
    }

    async function mostrarTabela() {
        const users = await User.findAll();
        console.log("========================");
        console.log("Dados do banco:");
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            console.log(
                user.dataValues.id,
                "Nome: ", user.dataValues.name,
                " | ",
                "Email: ", user.dataValues.email
            );
        }
        console.log("Voltando ao início...");
        reinicializar();
    }

    // Gerencia qual função executar de acordo com o número especificado
    if (execucao == 1) {
        inserirDados();
    } else if (execucao == 2) {
        procurarDados();
    } else if (execucao == 3) {
        excluirDados();
    } else if (execucao == 4) {
        mostrarTabela()
    }
}

function reinicializar() {
    setTimeout(() => {
        inicializar();
    }, 4000);
}

const buscarUsuario = async (dadoEmail: string) => {
    try {
        const usuario = await User.findOne({
            where: {
                email: dadoEmail,
            },
        });

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        } else {
            console.log(`Resultado encontrado:
${"=".repeat(30)}
ID: ${usuario.dataValues.id}
Nome: ${usuario.dataValues.name}
Email: ${usuario.dataValues.email}
${"=".repeat(30)}`);
        }
        return usuario;
        // console.log(`ID: ${usuario.dataValues.id}\nNome: ${usuario.dataValues.name}\nEmail: ${usuario.dataValues.email}`);
    } catch (error) {
        console.error(error);
    }
}