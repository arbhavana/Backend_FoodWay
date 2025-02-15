const Vendor = require('../models/Vendor');
const bcrypt = require("bcryptjs");
const jwt  = require("jsonwebtoken");
const dotEnv = require('dotenv');

dotEnv.config()

const secretKey = process.env.WhatIsYourName

const vendorRegister = async(req, res)=>{
    const {username, email, password} = req.body;
    try{
        const vendorEmail = await Vendor.findOne({email});
        if (vendorEmail){
            return res.status(400).json("email already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        });
        await newVendor.save();
        res.status(201).json({message: "vendor reg sucess"});
        console.log("registered")
    } catch(error){
        res.status(500).json({error: "servers error"});
        console.log(error);
        
    }
}

const vendorLogin = async(req, res)=>{
    const {email, password} = req.body;
    try{
        const vendor = await Vendor.findOne({email})
        if(!vendor || !(await bcrypt.compare(password, vendor.password))){
            return res.status(501).json("login unsuccessful");
        }else{
            const token = jwt.sign({vendorId: vendor._id}, secretKey,{expiresIn: "1h"})
            const vendorId = vendor._id;
            return res.status(201).json({message: "login success"}, toen)
        }
    } catch(error){
        res.status(500).json({error:"servers error"})
    }
}

const getAllVendors = async(req, res)=>{
    try {
        const vendors = await Vendor.find().populate('username')
    } catch (error) {
        
    }
}


module.exports = {vendorRegister, vendorLogin}
