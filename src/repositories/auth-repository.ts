import { prisma } from "../config"
import { userBody } from "../schemas/user-schema"


async function findUniqueByEmail(email: string){
    const result = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    return result
}

async function findUniqueById(userId: number){
    const result = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    return result
}

async function insertUser(body: Omit<userBody, "id">){
    const result = await prisma.user.create({
        data: {
            email: body.email,
            name: body.name,
            password: body.password,
        }
    })
    return result
}

async function insertSession(body: {id: number, token: string}){
    const result = await prisma.session.create({
        data: {
            userId: body.id,
            token: body.token
        }
    })
    return result
}

async function deleteSession(token: string){
    const result = await prisma.session.delete({
        where: {
            token: token
        }
    })
    return result
}

const authRepository = {
    findUniqueByEmail,
    insertUser,
    insertSession,
    deleteSession,
    findUniqueById
}

export default authRepository