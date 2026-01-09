const express=require("express");
const app=express();

const plantRoutes=require("./routes/plantRoutes");

app.use(express.json());
app.use("/plants",plantRoutes);
module.exports=app;
