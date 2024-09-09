import { prisma } from "../config"
import { taskBody } from "../schemas/task-schema"

async function findtasksByUserId(userId: number){
    const result = await prisma.task.findMany({
        where: {
            userId: userId
        }
    })
    return result
}

async function findTaskById(taskId: number){
    const result = await prisma.task.findFirst({
        where: {
            id: taskId
        }
    })
    return result
}

async function insertTask(userId: number, name: string, description: string){

    const result = await prisma.task.create({
        data: {
            userId: userId,
            name: name,
            description: description,
        }
    });

    return result

}

async function deleteTask(taskId: number){

    const result = await prisma.task.delete({
        where: {
           id: taskId,
        },
    });

    return result

}

async function setChecked(taskId: number){
    const result = await prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            isDone: true
        }
    })

    return result
}

async function setNewData(taskId: number, name: string, description: string){
    const result = await prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            name: name,
            description: description
        }
    })

    return result
}



const taskRepository = {
    findtasksByUserId,
    insertTask,
    findTaskById,
    deleteTask,
    setChecked,
    setNewData
}

export default taskRepository