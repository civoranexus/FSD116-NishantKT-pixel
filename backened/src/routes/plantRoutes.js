const express = require("express");
const router=express.Router();

const {
    addPlant,
    getAllPlants,
    updatePlant,
    deletePlant
}=require("../controllers/plantController");

router.get("/all",(req,res)=>
{
  const plants=getAllPlants();
  res.status(200).json(plants);
}
);
router.post("/add",(req,res)=>{
    const plant=addPlant(req.body);
    if(!plant)
    {return res.status(400).json({message:"all fields(name,price,category) are required"});
    }
    res.status(201).json(plant);}
    )
router.put("/:index", (req,res)=>{
    const updatedPlant= updatePlant(
        req.params.index,
        req.body
    );
    if(!updatedPlant){
        return res.status(404).json({ message:"Plant not found"});
    }
    res.json(updatedPlant);
}
);

router.delete("/:index",(req,res)=>{
    const deletedPlant=deletePlant(req.params.index);

    if(!deletedPlant){
        return res.status(404).json({message:"Plant not found"});
    }
    res.json({message:"Plant deleted successfully"});
}
);
module.exports=router;
