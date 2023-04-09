const mongoose=require("mongoose");
const DB=`mongodb+srv://kanak:shagun@cluster0.xqjjh3l.mongodb.net/socialmedia?retryWrites=true&w=majority`
mongoose.set('strictQuery',false);
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("database connected successfully");
}).catch((err)=>{
    console.log("no connection with database",err);
})