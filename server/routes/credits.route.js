import express from "express"
import {isAuth} from "../middleware/isAuth.js"
import { createCreditsOrder } from "../controllers/credits.controller.js"




export const creditRouter = express.Router()
creditRouter.post("/order" , isAuth ,createCreditsOrder )

