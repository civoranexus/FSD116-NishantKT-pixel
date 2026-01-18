const Plant = require("../models/Plant");
let plants=[];

const addPlant=(plantData)=>{
  console.log("Add plant request recieved:",plantData);
  const { name,price,category} = plantData;
  if(!name  || !price || !category)
  { console.log("Add plant failed:Missing fields"); 
    return null;
}
  const newPlant={
    id:plants.length + 1,
    name,
    price,
    category
  };
  plants.push(newPlant);
  console.log("Plant added successfully:",newPlant);
  return newPlant;};
const getAllPlants=()=>{
  return plants;
};

const updatePlant =(id,updatedData)=>{
  console.log(`upadte request for plant ID:${id}`,updatedData);
  const plant=plants.find(p=>p.id===id);
   if(!plant){
    console.log("update failed:Plant not found");
    return null;
   }
    Object.assign(plant,updatedData);
    console.log("Plant updated successfully",plant);
   return plant;
};

const deletePlant =(id)=>{
  console.log(`Delete request for plant id:${id}`);
  const index =plants.findIndex(p=>p.id===id);
  if(index=== -1){
    console.log("delete failed:Plant not found");
    return null;}
   const removed= plants.splice(index,1);
   console.log("plant deleted successfully:",removed[0]);
   return removed;
};
module.exports={
  addPlant,
  getAllPlants,
  updatePlant,
  deletePlant
};
