const express = require("express");
const router=express.Router();

const {
    addPlant,
    getAllPlants
}=require("../controllers/plantController");

router.get("/all",(req,res)=>
{
  const plants=getAllPlants();
  res.status(200).json(plants);
}
);
router.post("/add",(req,res)=>{
    const plant=addPlant(req.body);
    res.status(201).json(plant);}
    )

module.exports=router;
