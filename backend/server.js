import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import {connectDB} from './config/db.js';
import productRoutes from "./routes/product.routes.js";
import realestateRoutes from "./routes/realestate.routes.js";
import llmRoutes from "./routes/llm.routes.js";
import BuilderSignUp from "./models/builder.model.js"
import BuilderUpload from "./models/builder1.model.js";
import ExpertLogin from "./models/expert.js";
import RealEstate from "./models/realestate.model.js";



const app = express();
app.use(cors());


import dotenv from "dotenv";
dotenv.config();


app.use(express.json());

app.get("/builder-upload", async (req, res) => {
  try {
    const products = await BuilderUpload.find({});
    res.status(200).json(products); // Return the array directly
  } catch (error) {
    console.log("Error is fetching:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// app.get("/builder-upload/:id", async (req, res) => {
//   try {
//       const { id } = req.params;
//       console.log(id);
//       const building = await BuilderUpload.findById({_id: id}); // Fetch the building by ID

//       if (!building) {
//           return res.status(404).json({ message: "Building not found" });
//       }

//       res.json(building);
//   } catch (error) {
//       console.error("Error fetching building:", error.message);
//       res.status(500).json({ error: error.message });
//   }
// });

app.get("/builder-upload/:email", async (req, res) => {

  //console.log(buildings);

  try {
      const { email } = req.params; // Get the email parameter
      const buildings = await BuilderUpload.find({ email:email }); // Query by the email field
      console.log(buildings);

      if (buildings.length === 0) {
          return res.status(404).json({ message: "No data uploaded yet" });
      }
      
      res.json(buildings); // Send back the data
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.get("/api/builder-upload", async (req, res) => {
  try {
    const verifiedBuildings = await BuilderUpload.find({ verify: true });
    res.json(verifiedBuildings);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


app.get("/builder/:id", async (req, res) => {
  try {
      const { id } = req.params;
      console.log(id);
      const building = await BuilderUpload.findById({_id: id}); // Fetch the building by ID

      if (!building) {
          return res.status(404).json({ message: "Building not found" });
      }

      res.json(building);
  } catch (error) {
      console.error("Error fetching building:", error.message);
      res.status(500).json({ error: error.message });
  }
});





app.post("/builder-upload", async (req, res) => {
    try {
      const builderData = req.body; // Get data from the form
      const newBuilder = new BuilderUpload(builderData);
      await newBuilder.save();
      res.status(201).json({ message: "Builder data uploaded successfully!" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});


app.post("/api/builder-signup", async (req, res) => {
    try {
      const builderData = req.body; // Get data from the form
      const newBuilder = new BuilderSignUp(builderData);
      await newBuilder.save();
      res.status(201).json({ message: "Builder signed up successfully!" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

app.get("/api/builder-signup/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const builder = await BuilderSignUp.findOne({ email });
        if (!builder) return res.status(404).json({ message: "Builder not found" });
        res.json(builder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/builder-login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    try {
      // Check if builder exists in the database
      const builder = await BuilderSignUp.findOne({ email });
      if (!builder) {
        return res.status(404).json({ message: "Builder not found" });
      }
      console.log(password);
      console.log(builder.password);
      if(builder.password===password){
        console.log("yes");
       
      }
      else{
        return res.status(401).json({ message: "Invalid credentials" });
      }
     res.status(200).json({
        message: "Login successful"
      });
  
      // Compare the provided password with the hashed password in the database
  
      // Respond with builder details
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  app.post("/expert-login", async (req, res) => {
    const { expert_id, password } = req.body;
    const expert = await ExpertLogin.findOne({ expert_id, password });
    if (expert) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });


  app.put('/builder-upload/:buildingId', async (req, res) => {
    const { buildingId } = req.params;
    const { verify } = req.body;  // Expecting { "verify": true } in the request body

    try {
        const updatedBuilding = await BuilderUpload.findByIdAndUpdate(
            buildingId,
            { verify: verify },
            { new: true } // Returns the updated document
        );

        if (!updatedBuilding) {
            return res.status(404).json({ success: false, message: 'Building not found.' });
        }

        res.status(200).json({ success: true, message: 'Verification status updated.', data: updatedBuilding });
    } catch (error) {
        console.error('Error updating verification status:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});
app.get("/llm/:building_id", async (req, res) => {
  //console.log("hello");
  const { building_id } = req.params;  // Destructure the building_id from params
  console.log("hello garg ji");
  try {
    console.log("in try")
      const product = await RealEstate.find({  buildingId: building_id });  // Query by building_id
      console.log(product);

      if (!product) {
          return res.status(404).json({ success: false, message: "Building not found" });
      }

      res.status(200).json({ success: true, data: product });
  } catch (error) {
      console.log("Error fetching data: ", error.message);
      res.status(500).json({ success: false, message: "Server error" });
  }
});


app.use("/api/products",productRoutes);
app.use("/api/realestate",realestateRoutes);
app.use("/api/ask-llm",llmRoutes);
 

app.listen(5000, ()=>{
    connectDB();
    console.log("serve started at localhost/5000");
});