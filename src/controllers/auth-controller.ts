// Importa tipos e funções necessárias
import { AuthenticatedAdminRequest } from "../middlewares/authenticationAdmin-middlerare";
import { UserRole, userBody, authSCHEMA, fullUserBody } from "../schemas/user-schema";
import authService from "../services/auth-service";
import taskService from "../services/task-service";
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import httpStatus from "http-status";

// Função para criar um novo usuário
export async function createUser(req: Request, res: Response) {
    try {  
        // Verifica se o corpo da requisição está presente
        if (!req.body) {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }

        // Valida o corpo da requisição usando o esquema de autenticação
        const isValid = authSCHEMA.createFullUser.validate(req.body, { abortEarly: false });

        // Se houver erros na validação, retorna BAD_REQUEST
        if (isValid.error) {
            console.log(isValid.error);
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }

        // Desestrutura os dados necessários do corpo da requisição
        const { name, password, email }: Omit<fullUserBody, "id"> = req.body;

        // Verifica se já existe um usuário com o e-mail fornecido
        const hasEmail = await authService.getUniqueByEmail(email);

        if (hasEmail) {
            return res.sendStatus(httpStatus.CONFLICT);
        }

        // Cria o novo usuário
        const user = await authService.createUser({ name, email, password });

        // Prepara o corpo da resposta
        const userBody = {
            id: user.id,
            name: user.name,
        };

        // Retorna o usuário criado com status CREATED
        return res.status(httpStatus.CREATED).send(userBody);       

    } catch (error) {
        // Em caso de erro, loga o erro e retorna INTERNAL_SERVER_ERROR
        console.log(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

// Função para criar uma nova sessão (login)
export async function createSession(req: Request, res: Response) {
    try { 
        // Verifica se o corpo da requisição está presente
        if (!req.body) {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }

        // Valida o corpo da requisição usando o esquema de autenticação
        const isValid = authSCHEMA.createSession.validate(req.body, { abortEarly: false });

        // Se houver erros na validação, retorna BAD_REQUEST
        if (isValid.error) {
            console.log(isValid.error);
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }

        // Desestrutura os dados necessários do corpo da requisição
        const { email, password }: Omit<userBody, "id" | "name"> = req.body;

        // Verifica se o usuário existe
        const hasUser = await authService.getUniqueByEmail(email);

        if (!hasUser) {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
       
        // Verifica se a senha fornecida é válida
        const isValidPassword = bcrypt.compareSync(password, hasUser.password);

        if (!isValidPassword) {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }

        // Cria uma nova sessão e retorna o token
        const { token } = await authService.createSession(hasUser.id);

        return res.status(httpStatus.CREATED).send({ userId: hasUser.id, token, email, name: hasUser.name });
        
    } catch (error) {
        // Em caso de erro, loga o erro e retorna INTERNAL_SERVER_ERROR
        console.log(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

// Função para fazer logout do usuário
export async function logoutUser(req: Request, res: Response) {
    try {        
        // Obtém o cabeçalho de autorização da requisição
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }

        // Extrai o token do cabeçalho de autorização
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }

        // Remove a sessão do usuário
        await authService.deleteSession(token);

        // Retorna OK após a remoção da sessão
        return res.sendStatus(httpStatus.OK);
        
    } catch (error) {
        // Em caso de erro, loga o erro e retorna INTERNAL_SERVER_ERROR
        console.log(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
