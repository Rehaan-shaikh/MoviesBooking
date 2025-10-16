import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/DB.js';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/AuthRoutes.js";
import showRoutes from "./routes/ShowRoutes.js";
import movieRoutes from "./routes/MovieRoute.js";
import bookingRoutes from "./routes/BookingRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";
import foodRoutes from "./routes/FoodRoutes.js";

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
app.use("/api/show", showRoutes);
app.use("/api/movies" , movieRoutes);
app.use("/api/booking" , bookingRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/food",foodRoutes);
app.use("/api/search", showRoutes);


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});