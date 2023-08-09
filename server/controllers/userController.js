import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'

export async function login(req,res, next) {
    try {
        const {username,password} = req.body;
        const user = await userModel.findOne({username});
        if (!user) return res.json({msg: "Incorect Username or password",status: false})
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) res.json({msg: "Incorrect Username or Password", status: false})
        delete user.password;
        return res.json({status: true, user});


    }catch(e) {
     next(e)
    }
}

export async function register(req,res,next) {
    try {
      const {username,email,password} = req.body;
      const checkUsername = await userModel.findOne({username})
      if (checkUsername) res.json({msg: "Username already exist",status: false})
      const checkEmail = await userModel.findOne({email})
      if (checkEmail) res.json({msg: "Email already used", status: false})
      const hashedPassword = await bcrypt.hash(password,10)
      const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
      });
      delete user.password
      return res.json({status: true,user})
    }catch(e) {
        next(e)
    }
}

export async function fetchUsers(req,res,next){
    try {
     const id = req.params._id
     const users = await userModel.find({_id:{$ne: id}}).select([
        'email',
        'username',
        'avatarImage',
       '_id'
     ])
     res.json(users)
    }catch(e){
        next(e)
    }
}


export async function setAvatar(req,res,next){

    try {
      const userId = req.params.id;
      const avatarImage = req.body.image;
      const userData = await userModel.findByIdAndUpdate(
        userId,{
            isAvatarImageSet : true,
            avatarImage
        }
      )
      return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage})
    }catch(e) {
        next(e)
    }
}

export async function logout(req, res,next) {
    try {
      if (!req.params.id)
      return res.json({ msg: "User id is required " });
      onlineUsers.delete(req.params.id);
      return res.status(200).send();
    }catch(e) {
        next(e)
    }
}