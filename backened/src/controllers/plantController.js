const Plant = require("../models/Plant");
let plants=[];

const addPlant=(plantData)=>{
  const { name,price,category} = plantData;
  if(!name  || !price || !category)
  {  return null;
}
  const newPlant={
    id:plants.length + 1,
    name,
    price,
    category
  };
  plants.push(plantData);
  return plantData;};
const getAllPlants=()=>{
  return plants;
};

const updatePlant =(id,updatedData)=>{
  const plant=plants.find(p=>p.id===id);
   if(!plant){
    return null;
   }
    Object.assign(plant,updatedData);
   return plant;
};

const deletePlant =(id)=>{
  const index =plants.findIndex(p=>p.id===id);
  if(index=== -1){return null;}
   return plants.splice(index,1);
};
module.exports={
  addPlant,
  getAllPlants,
  updatePlant,
  deletePlant
};
