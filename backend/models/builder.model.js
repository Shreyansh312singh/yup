import mongoose from "mongoose";

const BuilderSignUpSchema = new mongoose.Schema(
  {
    builderName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures unique email addresses
    },
    password: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
  }
);

const BuilderSignUp = mongoose.model("BuilderSignUp", BuilderSignUpSchema);

export default BuilderSignUp;
