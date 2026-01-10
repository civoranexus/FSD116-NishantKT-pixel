const express=require("express");
const app=express();
app.use(express.json());
const plantRoutes=require("./routes/plantRoutes");


app.use("/plants",plantRoutes);
module.exports=app;
