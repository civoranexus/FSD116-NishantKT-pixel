const Plant = require("../models/Plant");
let plants=[];
const addPlant=(plantData)=>{
  plants.push(plantData);
  return plantData;};
const getAllPlants=()=>{
  return plants;
};
module.exports={
  addPlant,
  getAllPlants
};
