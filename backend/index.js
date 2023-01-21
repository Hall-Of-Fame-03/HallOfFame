import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import bodyParser from "body-parser";



//db connection
const app = express();
dotenv.config();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("MongoDB connected")
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!")
});

//middleware
/*
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
*/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

//app.use(express.static(path.join(__dirname, "../frontend/build")));


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500 ;
    const errorMessage = err.message || "Something went wrong" ;
    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});


app.listen(process.env.PORT , ()=>{
    connect()
    console.log("Listening PORT...")
})


