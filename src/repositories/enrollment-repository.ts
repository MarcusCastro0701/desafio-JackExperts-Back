import { prisma } from "../config"
import { enrollmentBody } from "../schemas/enrollment-schema"

async function findEnrollmentByUserId(userId: number){
    const result = await prisma.task.findFirst({
        where: {
            userId: userId
        }
    })
    return result
}




const enrollmentRepository = {
    findEnrollmentByUserId,
}

export default enrollmentRepository