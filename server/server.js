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

//Rest api, but a very simple one
app.get("/",(req , res)=>{
    res.send("Hello World!");
})

//These are REST API route groups
app.use("/api/auth", authRoutes); 
app.use("/api/show", showRoutes);
app.use("/api/movies" , movieRoutes);  //go to this to know wat this r called
app.use("/api/booking" , bookingRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/food",foodRoutes);
app.use("/api/search", showRoutes);


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});


// Your index.js is just the entry point. You don’t write all REST API endpoints there because your project is big.
// Instead, you:
// Group related endpoints in separate files (authRoutes, movieRoutes, etc.).
// Use app.use("/api/...") to tell Express: “All requests to this path should go to this route file.”
// Each route file then contains the actual REST API endpoints (GET, POST, DELETE, etc.) for that resource.
// So yes, you are using REST APIs, just in a modular way to keep your code clean and manageable.