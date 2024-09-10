import { AuthenticatedAdminRequest } from "../middlewares/authenticationAdmin-middlerare";
import { UserRole, userBody, authSCHEMA, fullUserBody } from "../schemas/user-schema";
import authService from "../services/auth-service";
import taskService from "../services/task-service";
import bcrypt from 'bcrypt'
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function createUser(req: Request, res: Response){
    try {  
        
        if(!req.body){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const isValid = authSCHEMA.createFullUser.validate(req.body, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const {name, password, email}: Omit<fullUserBody, "id"> = req.body


        const hasEmail = await authService.getUniqueByEmail(email)

        if (hasEmail){
            return res.sendStatus(httpStatus.CONFLICT)
        }

        const user = await authService.createUser({name, email, password})

        console.log(user)

        const userBody = {
            id: user.id,
            name: user.name,
        }

        return res.status(httpStatus.CREATED).send(userBody);       

    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function createSession(req: Request, res: Response){
    try { 
        
        if(!req.body){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const isValid = authSCHEMA.createSession.validate(req.body, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const {email, password}: Omit<userBody, "id" | "name" > = req.body

        const hasUser = await authService.getUniqueByEmail(email)

        if (!hasUser){
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
       
        const isValidPassword = bcrypt.compareSync(password, hasUser.password)

        if(!isValidPassword){
            return res.sendStatus(httpStatus.UNAUTHORIZED)
        }

        const { token } = await authService.createSession(hasUser.id)

        return res.send({userId: hasUser.id, token, email, name: hasUser.name,}).status(httpStatus.CREATED)
        

    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function logoutUser(req: Request, res: Response){
    try {        
        const authHeader = req.header("Authorization");

        if (!authHeader){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const token = authHeader.split(" ")[1];

        if (!token){
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }

        await authService.deleteSession(token)

        return res.sendStatus(httpStatus.OK)
        

    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}