import express from "express";
import axios from "axios";
import RealEstate from "../models/realestate.model.js"; // Update the path to your RealEstate model

const router = express.Router();

router.post("/:id", async (req, res) => {
    const userQuery = req.body.query; // Extract the user query
    const { id } = req.params; // Extract the real estate ID from the route parameter

    try {
        // Fetch the real estate data directly from MongoDB by ID
        const RealEstateData = await RealEstate.findById({_id:id});
        //console.log(RealEstateData)
        if (!RealEstateData) {
            return res.status(404).json({ error: "Input data not found for the provided ID" });
        }

        // Prepare input_data for the Python backend
        const pythonRequest = {
            query: userQuery,
            input_data: {
                Last_5_Year_Return: RealEstateData.Last_5_Year_Return,
                Last_1_Year_Return: RealEstateData.Last_1_Year_Return,
                Population_Growth: RealEstateData.population_growth,
                Medical_Facilities: RealEstateData.medical_facilites,
                Transportation_Access: RealEstateData.transportation_acess,
                Market_Facilities: RealEstateData.market_facilites,
                Job_Opportunity_Rate: RealEstateData.job_opportunities,
                Area_Developing_Rate: RealEstateData.area_developing_rate,
                Greater_Return: RealEstateData.Greater_return,
            },
        };

        console.log(pythonRequest.input_data)
        // Send the query and input_data to the Python backend
        const pythonResponse = await axios.post("http://localhost:3000/llm", pythonRequest);

        // Return the Python backend's response to the frontend
        res.json({ reply: pythonResponse.data.reply });
    } catch (error) {
        console.error("Error processing request:", error.message);
        res.status(500).json({ error: "Error processing request" });
    }
});

export default router;
