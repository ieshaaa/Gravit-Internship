require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connection = require("./db/conn");
const users = require("./models/userSchema");
const cors = require("cors");
const routr = require("./routes/routr");
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')


// const port = process.env.PORT || 8003;
const port = 8003;

connection();

app.use(cors());
app.use(express.json());

// app.get("/",(req,res)=>{
//     res.json("server start")
// })

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);

app.use(routr);

app.listen(port, () => {
    console.log(`server is start port number ${port}`);
});

