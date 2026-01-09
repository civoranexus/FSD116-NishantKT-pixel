const express = require("express");
const router=express.Router();

const {
    addPlant,
    getallPlants
}=require("../controllers/plantController");

router.get("/",(req,res)=>
{
  const plants=getallPlants();
  res.status(200).json(plants);
}
);
router.post("/",(req,res)=>{
    const plant=addPlant(req.body);
    res.json(plant);}
    )

module.exports=router;
