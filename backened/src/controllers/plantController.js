const Plant = require("../models/Plant");
let plants=[];
const addPlant=(planData)=>{
  plants.push(plantData);
  return plants;};
const getallPlants=()=>{
  return plants;
};
module.exports={
  addPlant,
  getallPlants
};
