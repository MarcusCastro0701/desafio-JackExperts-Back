import { createEnrollment } from '../controllers/enrollment-controller'
import { authenticateToken } from '../middlewares/authentication-middlerare'
import { Router } from 'express'

const enrollmentRouter = Router()

enrollmentRouter
    .all("/*", authenticateToken)
    .post("", createEnrollment)
    // .get("", )
    // .put("", )
    // .delete("", )


export { enrollmentRouter }