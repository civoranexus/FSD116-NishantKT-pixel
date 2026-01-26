const validatePlant=(req,res,next)=>{
    const{name,price,category}=req.body;
    if(!name || !price || !category)
    {
        res.status(400).json({message: "All fields are required"});
    }
    next();
};
module.exports=validatePlant;