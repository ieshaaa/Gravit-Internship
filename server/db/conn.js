const mongoose = require("mongoose");

// const DB = process.env.DATABASE
const DB = "mongodb+srv://Isha:Ishagupta%401@cluster0.n281zxm.mongodb.net/mernstack?retryWrites=true&w=majority";


// mongoose.connect(DB,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// }).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));



mongoose.connect(DB,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));