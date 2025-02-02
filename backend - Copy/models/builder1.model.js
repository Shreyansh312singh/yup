import mongoose from "mongoose";

const BuilderUploadSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true, // Ensures unique email addresses
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
      type: String, // Stores the file path or URL for the logo
      required: true,
    },
    verify:{
      type: Boolean,
      required: false,
      default: false,
    },
    termsAccepted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
  }
);

const BuilderUpload = mongoose.model("BuilderUpload", BuilderUploadSchema);

export default BuilderUpload;
