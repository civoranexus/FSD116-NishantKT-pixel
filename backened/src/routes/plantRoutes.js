const express = require("express");
const router = express.Router();


const {
  addPlant,
  getAllPlants,
  updatePlant,
  deletePlant,
  getPlantById,
  searchPlants,
  sortPlants
} = require("../controllers/plantController");

const validatePlant = require("../middleware/validatePlant");
const authenticateToken = require("../middleware/authMiddleware");


router.get("/all", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sortBy = req.query.sortBy;
  const order = req.query.order || "asc";

  let plants = getAllPlants(page, limit);
  plants = sortPlants(plants, sortBy, order);

  res.status(200).json({ page, limit, sortBy, order, data: plants });
});


router.get("/search", (req, res) => {
  const result = searchPlants(req.query);
  if (result.length === 0) {
    return res.status(404).json({ message: "No plants found" });
  }
  res.status(200).json(result);
});


router.get("/:id", (req, res, next) => {
  try {
    const plant = getPlantById(req.params.id);
    res.status(200).json(plant);
  } catch (error) {
    next(error);
  }
});

router.post("/add", authenticateToken,validatePlant, (req, res) => {
  const plant = addPlant(req.body);
  res.status(201).json(plant);
});


router.put("/:id", (req, res, next) => {
  try {
    const updatedPlant = updatePlant(req.params.id, req.body);
    res.status(200).json(updatedPlant);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const updatedPlant = updatePlant(id, req.body);
    res.status(200).json(updatedPlant);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const deletedPlant = deletePlant(req.params.id);
    res.status(200).json({
      message: "Plant deleted successfully",
      deletedPlant
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;