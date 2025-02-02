import mongoose from "mongoose";
import express from "express";
import Product from "../models/product.model.js";

const router = express.Router();

router.get("/",async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({ success:true, data:products});
    }
    catch(error){
        console.log("error is fetching ", error.message);
        res.status(500).json({ success:false, message:"server error"});
    }
});

router.post("/", async(req,res) =>{
    const product = req.body;

    if(!product.builder_name || !product.society_name || !product.Square_footprice || !product.location || !product.image){
        return res.status(400).json({ success:false , message:"please provide all fields"});
    }

    const newProduct = new Product(product)

    try{
        await newProduct.save();
        res.status(201).json({  success: true ,data : newProduct});
    }
    catch(error){
        console.error("error  in  create product:", error.message);
        res.status(500).json({success: false ,message :"server error"});
    }
});

router.put("/:id", async(req,res) =>{
    const{id} = req.params; 

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success:false , message:"invalid product id"});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new : true});
        res.status(200).json({success: true , data: updatedProduct});
    }
    catch(error){
        res.status(500).json({success: false , message: " server error"});
    }
});

router.delete("/:id", async(req,res) => {
    const {id} = req.params;

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true ,message: "product deleted"});
    }
    catch(error){
        res.status(404).json({ success:false  , message: "product not found"});
    }
});

export default router;
