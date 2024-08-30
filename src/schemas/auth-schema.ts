import joi from "joi";
import { enrollmentBody } from "./enrollment-schema";

export type userBody = {
    id: number,
    name: string,
    email: string,
    password: string,
}

export type fullUserBody = userBody & enrollmentBody

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN'
}



const createFullUser = joi.object<Omit<fullUserBody, "id">>({
    name: joi.string().min(3).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});

const createSession = joi.object<Omit<userBody, "role" | "name">>({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

const updateUser = joi.object<Omit<userBody, "role">>({
    id: joi.number().min(0).integer().required(),
    name: joi.string().min(3).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

const deleteUserById = joi.object<{id: number}>({
    id: joi.number().min(0).integer().required()
});

const authSCHEMA = {
    createFullUser,
    createSession,
    updateUser,
    deleteUserById
}

export { authSCHEMA };
