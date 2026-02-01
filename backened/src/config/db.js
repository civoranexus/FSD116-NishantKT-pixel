const mysql=require("mysql2");

const db =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"ktNishant@9698",
    database:"nursery_db"
});
db.connect((err)=>{
    if(err){
        console.error("Mysql connection failed:",err.message);
    } else {
        console.log("MySQL connected successfully");
    }
});
module.exports=db;