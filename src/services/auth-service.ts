// Importa o repositório de autenticação, esquemas de usuário, e bibliotecas para manipulação de JWT e bcrypt
import authRepository from "../repositories/auth-repository";
import { userBody } from "../schemas/user-schema";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

// Função para obter um usuário único por email
async function getUniqueByEmail(email: string) {
    // Chama o repositório para buscar o usuário com o email fornecido
    const result = await authRepository.findUniqueByEmail(email);
    return result;
}

// Função para obter um usuário único por ID
async function getUniqueById(userId: number) {
    // Chama o repositório para buscar o usuário com o ID fornecido
    const result = await authRepository.findUniqueById(userId);
    return result;
}

// Função para criar um novo usuário
async function createUser(body: Omit<userBody, "id">) {
    // Faz o hash da senha antes de armazená-la no banco de dados
    body.password = bcrypt.hashSync(body.password, 10);
    // Insere o novo usuário no repositório
    const result = await authRepository.insertUser(body);
    return result;
}

// Função para criar uma nova sessão para um usuário
async function createSession(userId: number) {
    // Gera um token JWT para o usuário
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET);
    // Insere a nova sessão no repositório
    const result = await authRepository.insertSession({ token, id: userId });
    return result;
}

// Função para deletar uma sessão
async function deleteSession(token: string) {
    // Remove a sessão do repositório usando o token fornecido
    const result = await authRepository.deleteSession(token);
    return result;
}

// Exporta o objeto com os métodos de autenticação
const authService = {
    getUniqueByEmail,
    createUser,
    createSession,
    deleteSession,
    getUniqueById
};

export default authService;
