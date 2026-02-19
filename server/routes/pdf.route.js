import express from "express"
import {isAuth} from "../middleware/isAuth.js"

import { pdfDownload } from "../controllers/pdf.controller.js"



export const pdfRouter = express.Router()


pdfRouter.post("/generate-pdf",isAuth,pdfDownload)

