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
    images: {
      type: [String], // Additional images
      required: false,
    },
    video: {
      type: String, // Video URL showcasing the flat
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
      type: [String], // List of amenities like 'Gym', 'Swimming Pool'
      required: false,
    },
    builderName: {
      type: String, // Name of the builder
      required: false,
    },
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
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
    priceRange2BHK: {
      min: { type: Number, required: false }, // Minimum price of 2BHK
      max: { type: Number, required: false }, // Maximum price of 2BHK
    },
    priceRange3BHK: {
      min: { type: Number, required: false }, // Minimum price of 3BHK
      max: { type: Number, required: false }, // Maximum price of 3BHK
    },
    location: {
      latitude: { type: Number, required: true }, // Latitude coordinate
      longitude: { type: Number, required: true }, // Longitude coordinate
    },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt'
  }
);

const BuilderUpload = mongoose.model("BuilderUpload", BuilderUploadSchema);
export default BuilderUpload;
