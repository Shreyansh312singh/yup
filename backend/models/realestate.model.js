import mongoose from "mongoose";

const UpdatedRealEstateSchema = new mongoose.Schema(
    {
        buildingId:{
            type: String,
            required: true,
        },
        five_year_return: {  // Changed field name to avoid starting with a number
            type: Number,
            required: true,
            description: "The 5-year return rate of the property."
        },
        one_year_return: {  // Changed field name to avoid starting with a number
            type: Number,
            required: true,
            description: "The 1-year return rate of the property."
        },
        builder_rating:{
            type: Number,
            required: true,
        },
        area_dev_rate: {
            type: Number,
            required: true,
            validate: {
                validator: (value) => value > 0,
                message: 'Area development rate must be a positive number.'
            },
            description: "The area development rate of the project."
        },
        facilities_rate: {
            type: Number,
            required: true,
            description: "Rate of the facilities available in the property."
        },
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt fields
    }
);

const RealEstate = mongoose.model("RealEstates", UpdatedRealEstateSchema);

export default RealEstate;