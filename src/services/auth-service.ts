import authRepository from "../repositories/auth-repository"
import { userBody } from "../schemas/auth-schema"
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'


async function getUniqueByEmail(email: string){
    const result = await authRepository.findUniqueByEmail(email)
    return result
}

async function getUniqueById(userId: number){
    const result = await authRepository.findUniqueById(userId)
    return result
}

async function createUser(body: Omit<userBody, "id">){
    body.password = bcrypt.hashSync(body.password, 10)
    const result = await authRepository.insertUser(body)
    return result
}

async function createSession(userId: number){
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET)
    const result = await authRepository.insertSession({token, id: userId})
    return result
}

async function deleteSession(token: string){
    const result = await authRepository.deleteSession(token)
    return result
}


const authService = {
    getUniqueByEmail,
    createUser,
    createSession,
    deleteSession,
    getUniqueById
}

export default authService