import mongoose from "mongoose";

const BuilderUploadSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    society_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Primary image
      required: false,
    },
    perSquareFootPrice: {
      type: Number,
      required: false,
    },
    totalArea: {
      type: Number, // Total area in square feet
      required: false,
    },
    constructionYear: {
      type: Number, // Year of construction
      required: false,
    },
    propertyAge: {
      type: Number, // Age of the property in years
      required: false,
    },
    amenities: {
      type: String, // List of amenities like 'Gym', 'Swimming Pool'
      required: false,
    },
    builderName: {
      type: String, // Name of the builder
      required: false,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    termsAccepted: {
      type: Boolean,
      required: true,
      default: false,
    },
    price2BHK: {
     type:Number,
     required:false,
    },
    price3BHK: {
      type:Number, // Maximum price of 3BHK
      required: false,
    },
    latitude: { type: Number, required: true }, // Latitude coordinate
    longitude: { type: Number, required: true }, // Longitude coordinate
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt'
  }
);

const BuilderUpload = mongoose.model("BuilderUpload", BuilderUploadSchema);
export default BuilderUpload;
