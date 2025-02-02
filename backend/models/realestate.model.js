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
        x_coordinate: {
            type: Number,
            required: true,
            description: "The X coordinate of the property location (for mapping)."
        },
        y_coordinate: {
            type: Number,
            required: true,
            description: "The Y coordinate of the property location (for mapping)."
        },
        property_age: {
            type: Number,
            required: true,
            description: "The age of the property in years."
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
        square_foot_price: {
            type: Number,
            required: true,
            description: "Price per square foot of the property."
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