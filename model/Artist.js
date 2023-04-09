const mongoose=require("mongoose");
const ArtistSchema=new mongoose.Schema({
    artistName:{
        type:String,
        required:true,
    },
    category:{
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

    showCaseVideo:{
        type:String,
        default:""
    },
    achievements:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
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
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true
})

const artist=mongoose.model('artist',ArtistSchema);
module.exports=artist;