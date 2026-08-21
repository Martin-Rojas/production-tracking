// import the model
import Production from "../models/ProductionRun.js";
import { calculateProduction } from "../utils/calculateProduction.js";

// create a new document
export const createProductionMongoDB = async (req, res) => {
   try {
      const { operator, wireType, coilsProduced, palletId } = req.body;

      // business calculations
      const { boxesUsed, zipTiesUsed, palletsCreated } =
         calculateProduction(coilsProduced);

      // generate  id
      const id = `run_${Date.now()}`;

      // create date
      const date = new Date();

      const productionRunData = {
         palletId,
         date,
         operator,
         wireType,
         coilsProduced,
         boxesUsed,
         zipTiesUsed,
         palletsCreated,
      };
      const newProductionRun = new Production(productionRunData);
      await newProductionRun.save(); // Save into DB

      res.status(201).json({
         message: "Production run created successfully",
         productionRun: newProductionRun,
      });
   } catch (error) {
      console.error("Error creating production run:", error);

      res.status(500).json({
         message: "Failed to create production run",
         error: error.message,
      });
   }
};
