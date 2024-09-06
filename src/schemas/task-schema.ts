import joi from "joi"

export type taskBody = {
    id: number,
    userId: number,
    name: string,
    description: string,
    isDone: boolean,
}

const create = joi.object<Omit<taskBody, "id" | "userId">>({
    name: joi.string().required().min(4),
    description: joi.string().required().min(10),
    isDone: joi.boolean().required(),
});

const update = joi.object<Omit<taskBody, "userId">>({
    name: joi.string().required().min(4),
    description: joi.string().required().min(10),
    isDone: joi.boolean().required(),
    
});

const deleteById = joi.object<{id: number}>({
    id: joi.number().min(0).integer().required()
});

const taskSCHEMA = {
    create,
    update,
    deleteById
}

export {taskSCHEMA}