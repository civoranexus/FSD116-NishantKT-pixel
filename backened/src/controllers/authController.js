const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const user={
    id:1,
    username:"admin",
    password:bcrypt.hashSync("admin123",10)
};

const login=(req,res,next)=>{
    try{
        const{username,password}=req.body;
        if(username!== user.username){
            const error=new Error("inavlid credentials");
            error.status=401;
            throw error;
        }
        const isMatch=bcrypt.compareSync(password,user.password);
        if(!isMatch){
            const error=new Error("Invalid credential");
            error.status=401;
            throw error;
        }
        const token=jwt.sign({id:user.id,username:user.username},
            "secretkey",{expiresIn:"1h"}
        );
        res.status(200).json({message:"Login successful",token});
    }
    catch (error){
        next(error);
    }
};
module.exports={login};