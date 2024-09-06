import { prisma } from "../config"
import { taskBody } from "../schemas/task-schema"

async function findtaskByUserId(userId: number){
    const result = await prisma.task.findFirst({
        where: {
            userId: userId
        }
    })
    return result
}




const taskRepository = {
    findtaskByUserId,
}

export default taskRepository