// Importa o cliente Prisma para interagir com o banco de dados
import { prisma } from "../config";

// Função para encontrar todas as tarefas associadas a um usuário pelo ID
async function findtasksByUserId(userId: number) {
    // Consulta o banco de dados para encontrar todas as tarefas com o userId fornecido
    const result = await prisma.task.findMany({
        where: {
            userId: userId
        }
    });
    return result;
}

// Função para encontrar uma tarefa pelo ID
async function findTaskById(taskId: number) {
    // Consulta o banco de dados para encontrar a primeira tarefa com o ID fornecido
    const result = await prisma.task.findFirst({
        where: {
            id: taskId
        }
    });
    return result;
}

// Função para inserir uma nova tarefa no banco de dados
async function insertTask(userId: number, name: string, description: string) {
    // Cria uma nova tarefa no banco de dados com os dados fornecidos
    const result = await prisma.task.create({
        data: {
            userId: userId,
            name: name,
            description: description,
        }
    });
    return result;
}

// Função para deletar uma tarefa pelo ID
async function deleteTask(taskId: number) {
    // Remove a tarefa do banco de dados com o ID fornecido
    const result = await prisma.task.delete({
        where: {
           id: taskId,
        },
    });
    return result;
}

// Função para marcar uma tarefa como concluída
async function setChecked(taskId: number) {
    // Atualiza a tarefa no banco de dados para definir a propriedade isDone como true
    const result = await prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            isDone: true
        }
    });
    return result;
}

// Função para atualizar os dados de uma tarefa (nome e descrição)
async function setNewData(taskId: number, name: string, description: string) {
    // Atualiza a tarefa no banco de dados com o novo nome e descrição fornecidos
    const result = await prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            name: name,
            description: description
        }
    });
    return result;
}

// Exporta o objeto com os métodos do repositório de tarefas
const taskRepository = {
    findtasksByUserId,
    insertTask,
    findTaskById,
    deleteTask,
    setChecked,
    setNewData
};

export default taskRepository;
