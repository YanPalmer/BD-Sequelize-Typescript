import { inicializar, prompt } from "..";
import { User } from "../modules/User/User.model";

export async function DBmanager(execucao: number) {
    // await User.drop(); Exclui os dados da tabela INTEIRA
    // const user = await User.create({ name: "Yan Doe", email: "john@gmail.com" });
    await User.sync();

    async function inserirDados() {
        const entradaNome = String(prompt("Digite seu nome: "));
        const entradaEmail = prompt("Digite seu email: ");
        try {
            await User.create({
                name: entradaNome,
                email: entradaEmail
            });
        } catch (error) {
            console.error("Email já existente!");
            console.log("Digite um outro email...");
            inserirDados();
        }

        console.log(`Usuário ${entradaNome} adicionado com sucesso!`);
        console.log("Sincronizando...");
        reinicializar();
    }

    async function procurarDados() {
        console.log("Procurar dados...");
        const dadoEmail = String(prompt("Digite o Email: "));
        await buscarUsuario(dadoEmail);
        // const buscarUsuario = async (email: string) => {
        //     try {
        //         const usuario = await User.findOne({
        //             where: {
        //                 email: dadoEmail,
        //             },
        //         });

        //         if (usuario) {
        //             console.log(`Resultado encontrado:`);
        //             console.log(`ID: ${usuario.dataValues.id}\nNome: ${usuario.dataValues.name}\nEmail: ${usuario.dataValues.email}`);
        //         }
        //     } catch (error) {
        //         console.error("Ocorreu um erro ao buscar o usuário:", error);
        //     }
        // }
        // await buscarUsuario(dadoEmail);
        // User.findOne({
        //     where: {
        //         name: dadoNome,
        //         email: dadoEmail,
        //     },
        // })
        // console.log(`Resultado encontrado para: ${dadoNome + ' ' + dadoEmail}`);
        console.log("Sincronizando...");
        reinicializar();
    }

    async function excluirDados() {
        let email: string = prompt("Email a ser excluído: ");
        console.log(`Excluido com sucesso...`)
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
        }
        console.log(`Resultado encontrado:
${"=".repeat(30)}
ID: ${usuario.dataValues.id}
Nome: ${usuario.dataValues.name}
Email: ${usuario.dataValues.email}
${"=".repeat(30)}`);
        // console.log(`ID: ${usuario.dataValues.id}\nNome: ${usuario.dataValues.name}\nEmail: ${usuario.dataValues.email}`);
    } catch (error) {
        console.error(error);
    }
}