import express from "express"
import { googleAuth, logOut } from "../controllers/auth.controller.js"

export const authRouter = express.Router()

authRouter.post("/google" , googleAuth)
authRouter.get("/logout" , logOut)
