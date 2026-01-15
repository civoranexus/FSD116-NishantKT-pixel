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
router.put("/:id", (req,res)=>{
    const id=parseInt(req.params.id);
    const updatedPlant= updatePlant(id,req.body );
    if(!updatedPlant){
        return res.status(404).json({ message:"Plant not found"});
    }
    res.json(updatedPlant);
}
);

router.delete("/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const deletedPlant=deletePlant(id);

    if(!deletedPlant){
        return res.status(404).json({message:"Plant not found"});
    }
    res.json({message:"Plant deleted successfully"});
}
);
module.exports=router;
