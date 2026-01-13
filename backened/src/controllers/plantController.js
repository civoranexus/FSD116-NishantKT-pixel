const Plant = require("../models/Plant");
let plants=[];

const addPlant=(plantData)=>{
  const { name,price,category} = plantData;
  if(!name  || !price || !category)
  {  return null;
}
  plants.push(plantData);
  return plantData;};
const getAllPlants=()=>{
  return plants;
};

const updatePlant =(index,updatedData)=>{
   if(plants[index]){
    plants[index]=
    {...plants[index], ...updatedData };
    return plants[index];
   }
   return null;
};

const deletePlant =(index)=>{
   if(plants[index]){
    const removedPlant=plants.splice(index,1);
    return removedPlant;
   }
   return null;
};
module.exports={
  addPlant,
  getAllPlants,
  updatePlant,
  deletePlant
};
