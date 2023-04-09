const mongoose=require("mongoose");
const EventSchema=new mongoose.Schema({
    artistId:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    },
    desc:{
        type:String,
        default:""
    },
    time:{
        type:String,
        default:""
    },
    bid:{
        type:Array,
        default:[]
    }
},{
    timestamps:true
})

const event=mongoose.model('event',EventSchema);
module.exports=event;