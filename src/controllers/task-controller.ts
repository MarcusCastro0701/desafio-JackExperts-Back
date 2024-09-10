// Importa tipos e funções necessárias
import { AuthenticatedRequest } from "../middlewares/authentication-middlerare";
import { taskBody, taskSCHEMA } from "../schemas/task-schema";
import taskService from "../services/task-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

// Função para criar uma nova tarefa
export async function createtask(req: AuthenticatedRequest, res: Response) {
    try {        
        // Valida o corpo da requisição usando o esquema de tarefas
        const isValid = taskSCHEMA.create.validate(req.body, { abortEarly: false });

        // Se houver erros na validação, retorna BAD_REQUEST
        if (isValid.error) {
            console.log(isValid.error);
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }

        // Desestrutura os dados necessários do corpo da requisição
        const { name, description }: Omit<taskBody, "id" | "userId" | "isDone"> = req.body;
        
        // Obtém o ID do usuário da requisição autenticada
        const { userId } = req;

        // Adiciona a nova tarefa
        await taskService.addTask(userId, name, description);
        
        // Retorna CREATED após adicionar a tarefa
        return res.sendStatus(httpStatus.CREATED);

    } catch (error) {
        // Em caso de erro, loga o erro e retorna BAD_REQUEST se o erro for "Not found user!", caso contrário retorna INTERNAL_SERVER_ERROR
        console.log(error);
        if (error.message === 'Not found user!') {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

// Função para exibir todas as tarefas de um usuário
export async function showAllTasks(req: AuthenticatedRequest, res: Response) {
    try {        
        // Obtém o ID do usuário da requisição autenticada
        const { userId } = req;

        // Obtém todas as tarefas do usuário
        const tasks = await taskService.gettasksByUserId(userId);
        
        // Retorna as tarefas com status CREATED
        return res.send(tasks).status(httpStatus.CREATED);

    } catch (error) {
        // Em caso de erro, loga o erro e retorna BAD_REQUEST se o erro for "Not found user!", caso contrário retorna INTERNAL_SERVER_ERROR
        console.log(error);
        if (error.message === 'Not found user!') {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

// Função para remover uma tarefa pelo ID
export async function removeTaskById(req: AuthenticatedRequest, res: Response) {
    try {      
        // Obtém o ID da tarefa dos parâmetros da requisição
        const { taskId } = req.params;

        // Remove a tarefa com o ID fornecido
        await taskService.removeTask(Number(taskId));

        // Retorna OK após remover a tarefa
        return res.sendStatus(httpStatus.OK);

    } catch (error) {
        // Em caso de erro, loga o erro e retorna BAD_REQUEST se o erro for "Not found task!", caso contrário retorna INTERNAL_SERVER_ERROR
        console.log(error);
        if (error.message === 'Not found task!') {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

// Função para atualizar o status de verificação de uma tarefa
export async function updateChecked(req: AuthenticatedRequest, res: Response) {
    try {      
        // Obtém o ID da tarefa dos parâmetros da requisição
        const { taskId } = req.params;
        
        // Valida o ID da tarefa usando o esquema de tarefas
        const isValid = taskSCHEMA.updateChecked.validate({ id: taskId }, { abortEarly: false });

        // Se houver erros na validação, retorna BAD_REQUEST
        if (isValid.error) {
            console.log(isValid.error);
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }

        // Alterna o status de verificação da tarefa
        await taskService.toggleCheck(Number(taskId));

        // Retorna OK após atualizar o status
        return res.sendStatus(httpStatus.OK);

    } catch (error) {
        // Em caso de erro, loga o erro e retorna BAD_REQUEST se o erro for "Not found task!", caso contrário retorna INTERNAL_SERVER_ERROR
        console.log(error);
        if (error.message === 'Not found task!') {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

// Função para atualizar os dados de uma tarefa
export async function setNewTaskData(req: AuthenticatedRequest, res: Response) {
    try {        
        // Valida o corpo da requisição usando o esquema de tarefas
        const isValid = taskSCHEMA.updateNewData.validate(req.body, { abortEarly: false });

        // Se houver erros na validação, retorna BAD_REQUEST
        if (isValid.error) {
            console.log(isValid.error);
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }

        // Desestrutura os dados necessários do corpo da requisição
        const { name, description }: Omit<taskBody, "id" | "userId" | "isDone"> = req.body;
        
        // Obtém o ID da tarefa dos parâmetros da requisição
        const { taskId } = req.params;

        // Atualiza os dados da tarefa
        await taskService.updateTaskData(Number(taskId), name, description);

        // Retorna OK após atualizar os dados da tarefa
        return res.sendStatus(httpStatus.OK);

    } catch (error) {
        // Em caso de erro, loga o erro e retorna BAD_REQUEST se o erro for "Not found task!", caso contrário retorna INTERNAL_SERVER_ERROR
        console.log(error);
        if (error.message === 'Not found task!') {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
