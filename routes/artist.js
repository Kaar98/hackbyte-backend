const express=require("express");
const bcrypt=require("bcrypt");
// const jwt=require("jsonwebtoken");
const router=express.Router();
const Artist=require('../model/Artist');
const Event=require('../model/Event');

// registering request 
router.post('/register',async (req,res)=>{
    // const pass=await bcrypt.hash(req.body.password,12);
    console.log("chal rha");
    const {artistName,email,password,category} = req.body;
    console.log(artistName,email,password,category)
    try{
    if(!artistName||!email||!password||!category){
      return res.status(404).json("data insufficient");
    }
    // if(password!==cpassword){
    //     return res.status(404).json("Invalid Credentials");
    // }
    const hpassword=await bcrypt.hash(password,12);
    // const hcpassword=await bcrypt.hash(cpassword,12);
    // console.log(hpassword);
    
    const user1=new Artist({artistName,email,password:hpassword,category});
    try{
        await user1.save();
        res.json(user1);
    }catch(err){
        res.json(err);
    }
}
catch(errr){
    console.log("isme error");

}
    
})


// login request 
router.post('/login',async (req,res)=>{
    try {
        const user = await Artist.findOne({ email: req.body.email });
        !user && res.status(403).json("user not found");
    
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(403).json("wrong password")
        res.status(200).json(user)
        
    
      } catch (err) {
        // res.status(403).json(err)
        console.log(err);
      }
 })

// update user 
router.put('/:id/update',async (req,res)=>{
    
        try{
            // if(req.body.password){
            //     try{
            //         req.body.password=await bcrypt.hash(req.body.password,12);
            //     }catch(err){
            //         res.status(402).json(err);
            //         return;
            //     }     
            // }
            try{
                await Artist.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                })
                res.status(200).json("User updated successfully");
                return;
            }catch(err){
                res.status(402).json(err);
                return;
            }
            
        }catch(err){
            res.status(402).json(err);
            return;
        }
    
})
 
// delete user 

// router.delete('/:id/delete',async (req,res)=>{
//     if(req.body.userId===req.params.id){
//         try{
//             await User.findByIdAndDelete(req.params.id);
//             return res.status(200).json("User deleted successfully");
//         }catch(err){
//             return res.status(402).json(err);
//         }
//     }else{
//         return res.status(402).json("User does not match for deletion");
//     }
// })

// get artist
router.get('/:id/getartist',async (req,res)=>{
    
    try{
        // if(req.body.userId===req.params.id){
            try{
                const usertosend=await Artist.findById(req.params.id);
                if(usertosend){
                    res.status(201).json(usertosend);
                }else{
                     res.status(402).json("User does not exist");
                     return;
                }
            }catch(err){
                res.status(402).json(err);
                return;
            }
        // }else{
        //     res.status(402).json("User does not exist");
        //     return;
        // }
    }catch(err){
        res.status(402).json(err);
        return;
    }
})

// follow a user 
// router.put('/:id/follow',async(req,res)=>{
//     if(req.body.userId!==req.params.id){
//         try{
//             const user=await User.findById(req.params.id);
//             const currUser=await User.findById(req.body.userId);
//             if(!user.followers.includes(req.body.userId)){
//                 await user.updateOne({$push:{followers:req.body.userId}});
//                 await currUser.updateOne({$push:{followings:req.params.id}});
//                 res.status(200).json("user followed");
//             }else{
//                 // const curruser2=await User.findById(req.body.userId);
//                 // const user2=await User.findById(req.params.id);
            
//                 // await curruser2.updateOne({$pull:{followings:req.params.id}});
//                 // await user2.updateOne({$pull:{followers:req.body.userId}});
//                 res.status(201).json("user already followed");
//             }
            
//         }
//         catch(err){
//             return res.status(404).json(err);
//         }
//     }else{
//         return res.status(403).json("User can not follow himself");
//     }
// })

// unfollow 
// router.put('/:id/unfollow',async (req,res)=>{
//     if(req.params.id!==req.body.userId){
//         try{
//             const curruser2=await User.findById(req.body.userId);
//             const user2=await User.findById(req.params.id);
//             if(curruser2.followings.includes(req.params.id)){
//                 await curruser2.updateOne({$pull:{followings:req.params.id}});
//                 await user2.updateOne({$pull:{followers:req.body.userId}});
//                 res.status(200).json("user unfollowed successfully");
//             }
//         }catch(err){
//             res.status(404).json(err);
//         }
//     }else{
//         return res.status(403).json("User can not unfollow himself");
//     }
// })
// get all artist
router.get('/allartist',async(req,res)=>{
    // Artist.find({},function (err,users){
    //     if(err){
    //         res.send("wrong");
    //         next();
    //     }
    //     res.json(users);
    // })
    const users=await Artist.find();
    const result = users.filter(checkAdult);

function checkAdult(users) {
  return users.category=="artist"
}
    res.send(result);
    
})

// recieving post requests and working on it 

// schedule event 
router.post('/schedule/event',async (req,res)=>{
    const post=new Event(req.body);
    if(post){
        try{
            await post.save();
            res.status(200).json(post._id);
        }catch(err){
            res.status(404).json(err);
            return 
        }
            
    }else{
        res.status(404).json("please upload the valid post");
        return 
    }
})

// update a event
router.put('/:id/updateEvent',async (req,res)=>{
    const post=await Event.findById(req.params.id);
    if(post.artistId===req.body.artistId){
        try{
            await post.updateOne({$set:req.body});
            res.status(200).json("post updated");
        }catch(err){
            res.status(404).json(err);
            return ;
        }
    }else{
        res.status(404).json("post does not match for updation");
        return ;
    }
})

// delete a event 
router.delete('/:id/deletePost',async (req,res)=>{
    const post=await Event.findById(req.params.id);
    
            try{
                await post.deleteOne();
                res.status(200).json("deleted");
            }catch(err){
                res.status(404).json(err);
                return ;
            }
})

// get a event
router.get('/:id/getPost',async (req,res)=>{
    try{
        const post=await Event.findById(req.params.id);
        
        res.status(200).json(post);
    }catch(err){
        res.status(404).json(err);
        return ;
    }
})

// like and dislike a event
router.put('/:id/bid',async (req,res)=>{
    const post=await Event.findById(req.params.id);
    if(post){
        if(post.bid.includes(req.body.artistId)){

            await post.updateOne({$pull:{bid:req.body.artistId}});
            res.status(200).json("bit deleted");
        }else{
            await post.updateOne({$push:{bid:req.body.artistId}});
            res.status(200).json("bid made");
        }
    }else{
        res.status(404).json("post not found");
        return ;
    }
})

// get all posts of himself and his followers posts 
// router.get('/timeline/:userId',async (req,res)=>{
//     try{

//         const currUser=await User.findById(req.params.userId);
//         if(!currUser){
//             res.status(404).json("user not found");
//             return;
//         }
//         try{
//             const hisPosts=await Event.find({userId:currUser._id});
//             const friendsPosts=await Promise.all(
//                 currUser.followings.map((friendsId)=>{
//                     return Event.find({userId:friendsId});
//                 })
//             )
//             res.status(201).json(hisPosts.concat(...friendsPosts));
//         }catch(err){
//             res.status(404).json(err);
//             return;
//         }
//     }catch(err){
//         res.status(404).json(err);
//         return;
//     }
// })

// get event of himself 
router.get('/userPosts/:userId',async (req,res)=>{
    try{

        const currUser=await Artist.findById(req.params.userId);
        if(!currUser){
            res.status(404).json("user not found");
            return;
        }
        try{
            const hisPosts=await Event.find({artistId:currUser._id});
            res.status(201).json(hisPosts);
        }catch(err){
            res.status(404).json(err);
            return;
        }
    }catch(err){
        res.status(404).json(err);
        return;
    }
})

// get all event
router.get('/allEvents',async (req,res)=>{
    // Artist.find({},function (err,users){
    //     if(err){
    //         res.send("wrong");
    //         next();
    //     }
    //     res.json(users);
    // })
    const users=await Event.find();
    res.send(users);
    
})


// get a event
router.get('/:id/getevent',async (req,res)=>{
    
    try{
        // if(req.body.userId===req.params.id){
            try{
                const usertosend=await Event.findById(req.params.id);
                if(usertosend){
                    res.status(201).json(usertosend);
                }else{
                     res.status(402).json("Event does not exist");
                     return;
                }
            }catch(err){
                res.status(402).json(err);
                return;
            }
        // }else{
        //     res.status(402).json("User does not exist");
        //     return;
        // }
    }catch(err){
        res.status(402).json(err);
        return;
    }
})

// sponsor bid




module.exports=router;