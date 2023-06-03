const express = require("express");
const routr = express.Router();
const users = require("../models/userSchema");

// router.get("/",(req,res)=>{
//     console.log("connect");
// });

// register

routr.post("/register",async(req,res)=>{
    // console.log(req.body);
    const {ProdID,Prodname,Prodcategory,Proddate,Prodcompany,Prodwarranty} = req.body;

    if(!ProdID || !Prodname || !Prodcategory || !Proddate || !Prodcompany || !Prodwarranty){
        res.status(422).json("Please fill the date");
    }

    try{
        const preuser = await users.findOne({ProdID:ProdID});
        console.log(preuser);

        if(preuser){
            res.status(422).json("this user is already present");
        }
        else{
            const adduser= new users({
                ProdID,Prodname,Prodcategory,Proddate,Prodcompany,Prodwarranty
            });
            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }
    }catch (error){
        res.status(422).json(error)
    }


});


// get userdata

routr.get("/getdata",async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual user

routr.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})

// update user data

routr.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})

// delete user
routr.delete("/deleteuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const deleteuser = await users.findByIdAndDelete({_id:id})
        console.log(deleteuser);
        res.status(201).json(deleteuser);

    } catch (error) {
        res.status(422).json(error);
    }
})





module.exports = routr;