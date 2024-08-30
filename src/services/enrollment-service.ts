
import enrollmentRepository from "../repositories/enrollment-repository";

import { enrollmentBody } from "../schemas/enrollment-schema";


async function getEnrollmentByUserId(userId: number){
    const result = await enrollmentRepository.findEnrollmentByUserId(userId)
    return result
}

const enrollmentService = {
    getEnrollmentByUserId,
}

export default enrollmentService