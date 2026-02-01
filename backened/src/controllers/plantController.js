
const addPlant=(plantData,callback)=>{
  const{name,price,category}=plantData;

  if(!name || price===undefined || !category){
    const error = new Error("All fields are required");
    error.status=400;
    return callback(error, null);
  }

  const query =`
    INSERT INTO plants (name, price, category)
    VALUES (?, ?, ?)`;

  db.query(query,[name,price,category],(err,result)=>{
    if(err) return callback(err,null);

    callback(null, {
      id: result.insertId,
      name,
      price,
      category
    });
  });
};

const db = require("../config/db");

const getAllPlants = (page = 1, limit = 5, callback) => {
  const offset = (page - 1) * limit;

  const query = `
    SELECT * FROM plants
    LIMIT ? OFFSET ?
  `;

  db.query(query, [limit, offset], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

const updatePlant=(id,updatedData,callback)=>{
  const {name,price,category}=updatedData;

  const query = `
    UPDATE plants
    SET name = ?, price = ?, category = ?
    WHERE id = ?`;

  db.query(query,[name,price,category,id], (err,result)=>{
    if(err) return callback(err,null);

    if(result.affectedRows===0){
      const error = new Error("Plant not found");
      error.status=404;
      return callback(error,null);
    }

    callback(null, {
      id,
      name,
      price,
      category
    });
  });
};

const deletePlant=(id,callback)=>{
  const query=`DELETE FROM plants WHERE plant_id = ?`;

  db.query(query,[id],(err,result)=>{
    if(err) return callback(err,null);

    if(result.affectedRows===0){
      const error = new Error("Plant not found");
      error.status=404;
      return callback(error,null);
    }

    callback(null,{message:"Plant deleted successfully"});
  });
};



const getPlantById=(id,callback)=>{
  const query=`SELECT * FROM plants WHERE plant_id = ?`;

  db.query(query,[id],(err,results)=>{
    if(err) return callback(err,null);

    if (results.length === 0){
      const error = new Error("Plant not found");
      error.status = 404;
      return callback(error,null);
    }

    callback(null,results[0]);
  });
};



const searchPlants=(query,callback)=>{
  const {name,category}=query;

  let sql ="SELECT * FROM plants WHERE 1=1";
  let values = [];

  if (name) {
    sql += " AND name LIKE ?";
    values.push(`%${name}%`);
  }

  if (category) {
    sql += " AND category = ?";
    values.push(category);
  }

  db.query(sql, values, (err, results) => {
    if (err) return callback(err, null);

    if (results.length === 0) {
      const error = new Error("No plants found");
      error.status = 404;
      return callback(error, null);
    }

    callback(null, results);
  });
};

module.exports = {
  searchPlants
};

module.exports = {
  addPlant,
  getAllPlants,
  updatePlant,
  deletePlant,
  getPlantById,
  searchPlants
};