
import taskRepository from "../repositories/task-repository";

import { userBody } from "../schemas/user-schema";


async function gettaskByUserId(userId: number){
    const result = await taskRepository.findtaskByUserId(userId)
    return result
}

const taskService = {
    gettaskByUserId,
}

export default taskService