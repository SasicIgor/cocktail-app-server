const express = require("express");
const app = express();
const cocktailRouter=require("./routes/cocktailsRoutes");
const userRouter=require("./routes/userRoutes");
const dataRouter=require("./routes/initialDataRoutes")
const cors=require("cors");

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use("/data", dataRouter);
app.use("/cocktails", cocktailRouter);
app.use("/users", userRouter);


module.exports = { app };
