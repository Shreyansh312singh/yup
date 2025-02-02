import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        builder_name:{
            type:String,
            required:true
        },
        society_name: {
            type: String,
            required: true
        },
        Square_footprice: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            
            required: true
        },
        image:{
            type: String,
            required:true
        },
    },
    {
        timestamps: true,//update , create
    }
);

const Product = mongoose.model("products", productSchema);

export default Product;