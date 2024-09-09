
import { AuthenticatedRequest } from "../middlewares/authentication-middlerare";
import { taskBody, taskSCHEMA } from "../schemas/task-schema";
import taskService from "../services/task-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function createtask(req: AuthenticatedRequest, res: Response){

    try {        
        const isValid = taskSCHEMA.create.validate(req.body, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const {name, description}: Omit<taskBody, "id" | "userId" | "isDone"> = req.body;
        
        const { userId } = req;

        await taskService.addTask(userId, name, description);
        
        return res.sendStatus(httpStatus.CREATED)
        

    } catch (error) {
        console.log(error)
        if(error.message === 'Not found user!'){
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function showAllTasks(req: AuthenticatedRequest, res: Response){

    try {        
        
        const { userId } = req;

        const tasks = await taskService.gettasksByUserId(userId);
        
        return res.send(tasks).status(httpStatus.CREATED)
        

    } catch (error) {
        console.log(error)
        if(error.message === 'Not found user!'){
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function removeTaskById(req: AuthenticatedRequest, res: Response){

    try {      
        
        const { taskId } = req.params;

        await taskService.removeTask(Number(taskId));

        return res.sendStatus(httpStatus.OK)
        

    } catch (error) {
        console.log(error)
        if(error.message === 'Not found task!'){
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function updateChecked(req: AuthenticatedRequest, res: Response){

    try {      

        const { taskId } = req.params;
        
        const isValid = taskSCHEMA.updateChecked.validate({id: taskId}, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        await taskService.toggleCheck(Number(taskId));

        return res.sendStatus(httpStatus.OK)
        

    } catch (error) {
        console.log(error)
        if(error.message === 'Not found task!'){
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function setNewTaskData(req: AuthenticatedRequest, res: Response){

    try {        

        const isValid = taskSCHEMA.updateNewData.validate(req.body, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const {name, description}: Omit<taskBody, "id" | "userId" | "isDone"> = req.body;
        
        const { taskId } = req.params;

        await taskService.updateTaskData(Number(taskId), name, description);

        return res.sendStatus(httpStatus.OK)
        

    } catch (error) {
        console.log(error)
        if(error.message === 'Not found task!'){
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}