import { createSession, createUser, logoutUser } from '../controllers/auth-controller'
import { authenticateToken } from '../middlewares/authentication-middlerare'
import { Router } from 'express'

const authRouter = Router()

authRouter
    .post("/sign-up", createUser)
    .post("/sign-in", createSession)
    .all("/*", authenticateToken)
    .delete("/logout", logoutUser)

export { authRouter }