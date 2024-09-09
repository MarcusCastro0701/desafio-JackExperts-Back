import joi from "joi"

export type taskBody = {
    id: number,
    userId: number,
    name: string,
    description: string,
    isDone: boolean,
}

const create = joi.object<Omit<taskBody, "id" | "userId" | "isDone">>({
    name: joi.string().required().min(4),
    description: joi.string().required().min(10),
});

const updateNewData = joi.object<Omit<taskBody, "id" | "userId" | "isDone" >>({
    name: joi.string().required().min(4),
    description: joi.string().required().min(10),
    
});

const updateChecked = joi.object<{id: number}>({
    id: joi.number().min(0).integer().required()
});

const taskSCHEMA = {
    create,
    updateNewData,
    updateChecked
}

export {taskSCHEMA}