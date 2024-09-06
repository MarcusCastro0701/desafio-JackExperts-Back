import { createtask } from '../controllers/task-controller'
import { authenticateToken } from '../middlewares/authentication-middlerare'
import { Router } from 'express'

const taskRouter = Router()

taskRouter
    .all("/*", authenticateToken)
    .post("", createtask)
    // .get("", )
    // .put("", )
    // .delete("", )


export { taskRouter }