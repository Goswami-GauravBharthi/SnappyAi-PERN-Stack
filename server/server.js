import express from "express"
import cors from "cors"
import 'dotenv/config'
import aiROuter from "./routes/ai.routes.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import { auth } from "./middleware/auth.js";

const app=express();

//connect with cloudinary for image api and url
await connectCloudinary();


const allowedOrigin = [process.env.ALLOW_ORIGINE];

app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//Routes for ai feature
app.use("/api/ai",auth,aiROuter);
app.use('/api/user',userRouter)

const PORT =process.env.PORT||3000;
app.listen(PORT,()=>{
  console.log("server is running on port : hello git ",PORT)
})







