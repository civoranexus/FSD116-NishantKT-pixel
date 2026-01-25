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
const getAllPlants=(page=1,limit=5)=>{
  const startIndex=(page -1)*limit;
  const endIndex=startIndex +limit;
  return plants.slice(startIndex,endIndex);
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
  const index =plants.findIndex(p=>p.id==id);
  if(index=== -1){
    console.log("delete failed:Plant not found");
    return null;}
   const removed= plants.splice(index,1);
   console.log("plant deleted successfully:",removed[0]);
   return removed[0];
};

const searchPlants=(query)=>{
  const {name,category}=query;
  return plants.filter(plant=>{
    return ((name && plant.name.toLowerCase().includes(name.toLowerCase())) || (category && plant.category.toLowerCase()===category.toLowerCase())
  );
  });
};

const sortPlants=(plants,sortby,order='asc')=>{
  if(!sortby)
    return plants;
  return plants.sort((a,b)=>{
    if(sortby==="price")
    {return order ==="asc"? a.price -b.price :b.price -a.price;}
    if(sortby==="name"){
      return order ==="asc" ? a.name.localeCompare(b.name):b.name.localeCompare(a.name);
    }
    return 0;
  });
};

const getPlantById=(id)=>{
  return plants.find(p=>p.id==id);
};
module.exports={
  addPlant,
  getAllPlants,
  updatePlant,
  deletePlant,
  getPlantById,
  searchPlants,
  sortPlants
};
