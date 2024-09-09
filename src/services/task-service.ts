
import taskRepository from "../repositories/task-repository";
import authRepository from "@/repositories/auth-repository";
import { notFoundError } from "@/errors/not-found-error";
import { userBody } from "../schemas/user-schema";

async function gettasksByUserId(userId: number){
    const findById = await authRepository.findUniqueById(userId);
     if(!findById){
        throw notFoundError('Not found user!')
     }
    const result = await taskRepository.findtasksByUserId(userId)
    return result
}

async function addTask(userId: number, name: string, description: string){

    const findById = await authRepository.findUniqueById(userId);
     if(!findById){
        throw notFoundError('Not found user!')
     }

     const insertTask = await taskRepository.insertTask(userId, name, description);

     return insertTask

}

async function removeTask(taskId: number){

    const verifyTask = await taskRepository.findTaskById(taskId);
    if(!verifyTask){
        throw notFoundError('Not found task!');
    }

    const deletingTask = await taskRepository.deleteTask(taskId);

    return deletingTask

}

async function toggleCheck(taskId: number){

    const verifyTask = await taskRepository.findTaskById(taskId);
    if(!verifyTask){
        throw notFoundError('Not found task!');
    }

    const toggle = await taskRepository.setChecked(taskId);

    return toggle

}

async function updateTaskData(taskId: number, name: string, description: string){

    const verifyTask = await taskRepository.findTaskById(taskId);
    if(!verifyTask){
        throw notFoundError('Not found task!');
    }

    const set = await taskRepository.setNewData(taskId, name, description);

    return set

}

const taskService = {
    gettasksByUserId,
    addTask,
    removeTask,
    toggleCheck,
    updateTaskData
}

export default taskService