import { inicializar, prompt } from "..";
import { User } from "../modules/User/User.model";

export async function DBmanager(execucao: number) {
    // await User.drop(); Exclui os dados da tabela INTEIRA
    // const user = await User.create({ name: "Yan Doe", email: "john@gmail.com" });
    await User.sync();

    async function inserirDados() {
        const entradaNome = String(prompt("Digite seu nome: "));
        const entradaEmail = prompt("Digite seu email: ");
        await User.create({
            name: entradaNome,
            email: entradaEmail
        });
        console.log(`Usuário ${entradaNome} adicionado com sucesso!`);
        console.log("Sincronizando...");
        setTimeout(() => {
            inicializar();
        }, 4000);
    }

    async function procurarDados() {
        console.log("Procurar dados...")
        const dadoNome = String(prompt("Digite o Nome: "));
        const dadoEmail = String(prompt("Digite o Email: "));
        const buscarUsuario = async (nome: string, email: string) => {
            try {
                const usuario = await User.findOne({
                    where: { nome, email },
                });

                if (usuario) {
                    console.log(`ID: ${usuario.id}`)
                } else {
                    console.log("Usuárioo não encontrado.");
                }
            } catch (error) {
                console.error("Ocorreu um erro ao buscar o usuário:", error)
            }
        }
        await buscarUsuario(dadoNome, dadoEmail);

        // User.findOne({
        //     where: {
        //         name: dadoNome,
        //         email: dadoEmail,
        //     },
        // })
        console.log(`Resultado encontrado para: ${dadoNome + ' ' + dadoEmail}`);
        console.log("Sincronizando...");
        setTimeout(() => {
            inicializar();
        }, 4000);
    }

    async function excluirDados() {

    }

    async function mostrarTabela() {
        const users = await User.findAll();
        console.log("========================");
        console.log("Dados do banco:");
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            console.log(
                user.dataValues.id,
                user.dataValues.name,
                user.dataValues.email
            );
        }
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