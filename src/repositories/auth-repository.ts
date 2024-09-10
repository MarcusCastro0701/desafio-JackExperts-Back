// Importa o cliente Prisma para interagir com o banco de dados
import { prisma } from "../config";
import { userBody } from "../schemas/user-schema";

// Função para encontrar um usuário pelo e-mail
async function findUniqueByEmail(email: string) {
    // Consulta o banco de dados para encontrar um usuário com o e-mail fornecido
    const result = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    return result;
}

// Função para encontrar um usuário pelo ID
async function findUniqueById(userId: number) {
    // Consulta o banco de dados para encontrar um usuário com o ID fornecido
    const result = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    return result;
}

// Função para inserir um novo usuário no banco de dados
async function insertUser(body: Omit<userBody, "id">) {
    // Cria um novo usuário no banco de dados com os dados fornecidos
    const result = await prisma.user.create({
        data: {
            email: body.email,
            name: body.name,
            password: body.password,
        }
    });
    return result;
}

// Função para inserir uma nova sessão no banco de dados
async function insertSession(body: { id: number, token: string }) {
    // Cria uma nova sessão no banco de dados com o ID do usuário e o token fornecido
    const result = await prisma.session.create({
        data: {
            userId: body.id,
            token: body.token
        }
    });
    return result;
}

// Função para deletar uma sessão pelo token
async function deleteSession(token: string) {
    // Remove a sessão do banco de dados com o token fornecido
    const result = await prisma.session.delete({
        where: {
            token: token
        }
    });
    return result;
}

// Exporta o objeto com os métodos do repositório de autenticação
const authRepository = {
    findUniqueByEmail,
    insertUser,
    insertSession,
    deleteSession,
    findUniqueById
};

export default authRepository;
