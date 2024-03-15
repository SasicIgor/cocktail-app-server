const express = require("express");
const app = express();
const cocktailRouter=require("./routes/cocktailsRoutes");
const userRouter=require("./routes/userRoutes");
const cors=require("cors");

app.use(cors());
app.use(express.json());
app.use("/cocktails", cocktailRouter);
app.use("/users", userRouter);


module.exports = { app };
