
import { AuthenticatedRequest } from "../middlewares/authentication-middlerare";
import { enrollmentBody, enrollmentSCHEMA } from "../schemas/enrollment-schema";
import enrollmentService from "../services/enrollment-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function createEnrollment(req: AuthenticatedRequest, res: Response){
    try {        

        const isValid = enrollmentSCHEMA.create.validate(req.body, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const {cpf, birthday, phone, address, cep, city, neighborhood, uf}: Omit<enrollmentBody, "id" | "userId"> = req.body
        const { userId } = req

        const hasEnrollment = await enrollmentService.getEnrollmentByUserId(userId)

        if (hasEnrollment) {
            res.sendStatus(httpStatus.CONFLICT)
            return
        }
        

        return res.sendStatus(httpStatus.CREATED)
        

    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}