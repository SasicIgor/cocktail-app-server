const express = require("express");
const app = express();
const cocktailRouter=require("./routes/cocktailsRoutes");

app.use(express.json());
app.use("/cocktails", cocktailRouter);


module.exports = { app };
