
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

        const {name, description, isDone}: Omit<taskBody, "id" | "userId"> = req.body
        const { userId } = req

        const hastask = await taskService.gettaskByUserId(userId)

        if (hastask) {
            res.sendStatus(httpStatus.CONFLICT)
            return
        }
        

        return res.sendStatus(httpStatus.CREATED)
        

    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}