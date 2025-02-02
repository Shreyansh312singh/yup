import mongoose from "mongoose";
import express from "express";
import RealEstate from "../models/realestate.model.js";
import Product from "../models/product.model.js";

const router = express.Router();

router.get("/",async(req,res)=>{
    try{
        const products = await RealEstate.find({});
        res.status(200).json({ success:true, data:products});
    }
    catch(error){
        console.log("error is fetching ", error.message);
        res.status(500).json({ success:false, message:"server error"});
    }
});

router.get("/:id",async(req,res)=>{
    const {id} = req.params;
    try{
        const products = await RealEstate.findById( id );
        res.status(200).json({ success:true, data:products});
    }
    catch(error){
        console.log("error is fetching ", error.message);
        res.status(500).json({ success:false, message:"server error"});
    }
});

router.post("/", async(req,res) =>{
    const product = req.body;
    console.log(product);
    console.log(product.buildingId);

    if (
        !product.buildingId || // Match with frontend (buildingId)
        !product.five_year_return ||
        !product.one_year_return ||
        !product.x_coordinate ||
        !product.y_coordinate ||
        !product.property_age ||
        !product.area_dev_rate ||
        !product.square_foot_price ||
        !product.facilities_rate
    ) {
        return res.status(400).json({ message: "All fields are required." });
    }
    
    

    const newProduct = new RealEstate(product)
    // console.log(newProduct);
    try{
        await newProduct.save();
        //await Product.findByIdAndDelete(id);
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
        const updatedProduct = await RealEstate.findByIdAndUpdate(id, product, {new : true});
        res.status(200).json({success: true , data: updatedProduct});
    }
    catch(error){
        res.status(500).json({success: false , message: " server error"});
    }
});

router.delete("/:id", async(req,res) => {
    const {id} = req.params;

    try{
        await RealEstate.findByIdAndDelete(id);
        res.status(200).json({success:true ,message: "product deleted"});
    }
    catch(error){
        res.status(404).json({ success:false  , message: "product not found"});
    }
});

export default router;