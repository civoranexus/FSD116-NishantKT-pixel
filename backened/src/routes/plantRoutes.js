const express = require("express");
const router = express.Router();

const {
  addPlant,
  getAllPlants,
  updatePlant,
  deletePlant,
  getPlantById
} = require("../controllers/plantController");

const validatePlant = require("../middleware/validatePlant");
const authenticateToken = require("../middleware/authMiddleware");


router.get("/all", (req,res,next) => {
  const page=parseInt(req.query.page) || 1;
  const limit=parseInt(req.query.limit) || 5;

  getAllPlants(page,limit,(err, plants) => {
    if(err) return next(err);
    res.status(200).json({ page,limit,data:plants });
  });
});


router.get("/:id", (req,res,next) => {
  getPlantById(req.params.id,(err, plant) => {
    if(err) return next(err);
    res.status(200).json(plant);
  });
});


router.post("/add",authenticateToken,validatePlant,(req,res,next)=>{
  addPlant(req.body,(err, plant)=>{
    if(err) return next(err);
    res.status(201).json(plant);
  });
});

router.put("/:id", (req, res, next) => {
  updatePlant(req.params.id, req.body, (err, updatedPlant) => {
    if (err) return next(err);
    res.status(200).json(updatedPlant);
  });
});


router.delete("/:id", (req, res, next) => {
  deletePlant(req.params.id, (err, result) => {
    if (err) return next(err);
    res.status(200).json(result);
  });
});

router.get("/search", (req, res, next) => {
  searchPlants(req.query, (err, plants) => {
    if (err) return next(err);
    res.status(200).json(plants);
  });
});

const authorizeRole = require("../middleware/authorizeRole");

router.delete("/:id",authenticateToken,authorizeRole("admin"),(req,res,next)=>{
    deletePlant(req.params.id,(err,result)=>{
      if (err) return next(err);
      res.json(result);
    });
  }
);

module.exports = router;