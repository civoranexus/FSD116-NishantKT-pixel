let plants = [];


const addPlant = (plantData) => {
  const { name, price, category } = plantData;

  if (!name || price === undefined || !category) {
    const error = new Error("All fields (name, price, category) are required");
    error.status = 400;
    throw error;
  }

  const newPlant = {
    id: plants.length + 1,
    name,
    price,
    category
  };

  plants.push(newPlant);
  return newPlant;
};

const getAllPlants = (page = 1, limit = 5) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return plants.slice(startIndex, endIndex);
};

const updatePlant = (id, updatedData) => {
  const plant = plants.find(p => p.id == id);

  if (!plant) {
    const error = new Error("Plant not found");
    error.status = 404;
    throw error;
  }

  Object.assign(plant, updatedData);
  return plant;
};


const deletePlant = (id) => {
  const index = plants.findIndex(p => p.id == id);

  if (index === -1) {
    const error = new Error("Plant not found");
    error.status = 404;
    throw error;
  }

  const removedPlant = plants.splice(index, 1);
  return removedPlant[0];
};


const searchPlants = (query) => {
  const { name, category } = query;

  return plants.filter(plant => {
    return (
      (name && plant.name.toLowerCase().includes(name.toLowerCase())) ||
      (category && plant.category.toLowerCase() === category.toLowerCase())
    );
  });
};


const sortPlants = (plants, sortBy, order = "asc") => {
  if (!sortBy) return plants;

  return plants.sort((a, b) => {
    if (sortBy === "price") {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    }

    if (sortBy === "name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    return 0;
  });
};


const getPlantById = (id) => {
  const plant = plants.find(p => p.id == id);

  if (!plant) {
    const error = new Error("Plant not found");
    error.status = 404;
    throw error;
  }

  return plant;
};

module.exports = {
  addPlant,
  getAllPlants,
  updatePlant,
  deletePlant,
  getPlantById,
  searchPlants,
  sortPlants
};