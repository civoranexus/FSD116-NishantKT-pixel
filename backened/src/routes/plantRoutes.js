const express = require("express");
const router=express.Router();

const {
    addPlant,
    getAllPlants,
    updatePlant,
    deletePlant,
    getPlantById,
    searchPlants,
    sortPlants
}=require("../controllers/plantController");

router.get("/all",(req,res)=>
{ const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit)||5;
    const sortby=req.query.sortby;
    const order=req.query.order|| "asc";
  let plants=getAllPlants(page,limit);
  plants=sortPlants(plants,sortby,order);
  res.status(200).json({page,limit,sortby,order,data:plants});
}
);
router.get("/search",(req,res)=>{
    const result=searchPlants(req.query);
    if(result.length===0){
        return res.status(404).json({message:"No plants found"});
    }
    res.status(200).json(result);
});


router.get("/:id",(req,res)=>{
    const plant=getPlantById(req.params.id);
    if(!plant){
        return res.status(404).json({message:"Plant not found"});
    }
    res.status(200).json(plant);
}
);
const validatePlant=require("../middleware/valiadatePlant");
router.post("/add",validatePlant,(req,res)=>{
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
    res.status(200).json({message:"Plant deleted successfully","deletedPlant":deletePlant});
}
);
module.exports=router;
