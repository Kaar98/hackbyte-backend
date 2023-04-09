const express=require("express");
const app=express();

const dotenv=require("dotenv");

const cors =require("cors");

// const path=require("path");
// dotenv.config({path:'./config.env'});
// const PORT=process.env.PORT;

// importing mongodb connection 
require('./conn');
app.use(express.json());
// app.use(helmet());
// app.use(cors());
 
 app.use(cors())
// app.use(morgan("common"));
// requiring router 
// app.use(require('./router'));
const artistRouter= require('./routes/artist');
app.use('/api',artistRouter);
// app.use("/images", express.static(path.join(__dirname, "public/images")));

// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"public/images");
//     },filename:(req,file,cb)=>{
//         cb(null,req.body.name);
//     }
    
// })
// const upload=multer({storage:storage});
// app.post('/uploadImage',upload.single("file"),(req,res)=>{
//     try{
//         res.status(200).json("image uploaded successfully");
//     }catch(err){
//         res.status(401).json(err);
//     }
// })
// miidlewares 


// listening at port 
app.listen(9000,()=>{
    console.log(`app is running on port 9000`); 
})

