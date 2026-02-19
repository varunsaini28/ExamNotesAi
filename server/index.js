import express from 'express'
import dotenv from 'dotenv';
import { connectDb } from './utils/connectDb.js';
import { authRouter } from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRouter } from './routes/user.route.js';
import {notesRouter} from './routes/genrate.route.js';
import {pdfRouter} from "./routes/pdf.route.js"
import {creditRouter} from "./routes/credits.route.js"
dotenv.config();

const app=express();



app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {origin:"https://examnotesaiclient-vxoa.onrender.com",
    credentials:true,
    methods:["GET", "POST", "PUT", "DELETE"]
}

))

app.get('/',(req, res)=>{
    res.json({message:"ExamNotesAI backend is running"})
})

app.use("/api/auth",authRouter)
app.use("/api/user", userRouter)
app.use("/api/notes", notesRouter)
app.use("/api/pdf", pdfRouter)
app.use("/api/credit",creditRouter)

connectDb()
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
