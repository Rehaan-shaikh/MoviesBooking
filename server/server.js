import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/DB.js';
import authRoutes from "./routes/AuthRoutes.js";
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

await connectDB();

//middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

//API routes
app.get("/",(req , res)=>{
    res.send("Hello World!");
})

//setting up routes 
app.use("/api/auth", authRoutes);


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});