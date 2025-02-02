import mongoose from "mongoose";

const ExpertLoginSchema = new mongoose.Schema(
  {
    expert_id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
  }
);

const ExpertLogin = mongoose.model("ExpertLogin", ExpertLoginSchema);

export default ExpertLogin;
