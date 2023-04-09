const mongoose=require("mongoose");
const SponsorSchema=new mongoose.Schema({
    artistName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,

    },
    city:{
        type:String,
        default:""
    },
    from:{
        type:String,
        default:""
    },
    disc:{
        type:String,
        default:""
    }
    
},{
    timestamps:true
})

const sponsor=mongoose.model('sponsor',SponsorSchema);
module.exports=sponsor;