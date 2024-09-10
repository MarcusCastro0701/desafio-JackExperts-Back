import { createtask, showAllTasks, removeTaskById, updateChecked, setNewTaskData } from '../controllers/task-controller'
import { authenticateToken } from '../middlewares/authentication-middlerare'
import { Router } from 'express'

const taskRouter = Router()

taskRouter
    .all("/*", authenticateToken)
    .post("/", createtask)
    .get("/", showAllTasks)
    .put("/check/:taskId", updateChecked)
    .put("/data/:taskId", setNewTaskData)
    .delete("/:taskId", removeTaskById)


export { taskRouter }