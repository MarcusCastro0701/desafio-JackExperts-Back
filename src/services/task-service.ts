// Importa o repositório de tarefas, repositório de autenticação, e uma função para erros de não encontrado
import taskRepository from "../repositories/task-repository";
import authRepository from "@/repositories/auth-repository";
import { notFoundError } from "@/errors/not-found-error";

// Função para obter tarefas de um usuário pelo ID
async function gettasksByUserId(userId: number) {
    // Verifica se o usuário existe pelo ID fornecido
    const findById = await authRepository.findUniqueById(userId);
    if (!findById) {
        // Lança um erro se o usuário não for encontrado
        throw notFoundError('Not found user!');
    }
    // Obtém as tarefas associadas ao ID do usuário
    const result = await taskRepository.findtasksByUserId(userId);
    return result;
}

// Função para adicionar uma nova tarefa para um usuário
async function addTask(userId: number, name: string, description: string) {
    // Verifica se o usuário existe pelo ID fornecido
    const findById = await authRepository.findUniqueById(userId);
    if (!findById) {
        // Lança um erro se o usuário não for encontrado
        throw notFoundError('Not found user!');
    }
    // Insere a nova tarefa no repositório
    const insertTask = await taskRepository.insertTask(userId, name, description);
    return insertTask;
}

// Função para remover uma tarefa pelo ID
async function removeTask(taskId: number) {
    // Verifica se a tarefa existe pelo ID fornecido
    const verifyTask = await taskRepository.findTaskById(taskId);
    if (!verifyTask) {
        // Lança um erro se a tarefa não for encontrada
        throw notFoundError('Not found task!');
    }
    // Remove a tarefa do repositório
    const deletingTask = await taskRepository.deleteTask(taskId);
    return deletingTask;
}

// Função para alternar o status de verificação de uma tarefa (marcar como concluída ou pendente)
async function toggleCheck(taskId: number) {
    // Verifica se a tarefa existe pelo ID fornecido
    const verifyTask = await taskRepository.findTaskById(taskId);
    if (!verifyTask) {
        // Lança um erro se a tarefa não for encontrada
        throw notFoundError('Not found task!');
    }
    // Alterna o status de verificação da tarefa
    const toggle = await taskRepository.setChecked(taskId);
    return toggle;
}

// Função para atualizar os dados de uma tarefa
async function updateTaskData(taskId: number, name: string, description: string) {
    // Verifica se a tarefa existe pelo ID fornecido
    const verifyTask = await taskRepository.findTaskById(taskId);
    if (!verifyTask) {
        // Lança um erro se a tarefa não for encontrada
        throw notFoundError('Not found task!');
    }
    // Atualiza os dados da tarefa no repositório
    const set = await taskRepository.setNewData(taskId, name, description);
    return set;
}

// Exporta o objeto com os métodos do serviço de tarefas
const taskService = {
    gettasksByUserId,
    addTask,
    removeTask,
    toggleCheck,
    updateTaskData
};

export default taskService;
