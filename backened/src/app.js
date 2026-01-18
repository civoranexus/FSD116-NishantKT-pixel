const errorHandler=require("./middleware/errorHandler");
const express=require("express");
const logger=require("./middleware/logger");
const app=express();

const plantRoutes=require("./routes/plantRoutes");

app.use(express.json());
app.use(logger);
app.use("/plants",plantRoutes);
app.use(errorHandler);
module.exports=app;
