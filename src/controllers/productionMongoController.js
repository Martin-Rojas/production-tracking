// import the model
import Production from "../models/ProductionRun.js";
import { validateData } from "../utils/validateProduction.js";
import { calculateProduction } from "../utils/calculateProduction.js";

// create a new document
export const createProductionMongoDB = async (req, res) => {
   try {
      // validate data
      const error = validateData(req.body);

      if (error) {
         return res.status(400).json({ error });
      }
      const { operator, wireType, coilsProduced, palletId } = req.body;

      // business calculations
      const { boxesUsed, zipTiesUsed, palletsCreated } =
         calculateProduction(coilsProduced);

      // create date
      const date = new Date();

      // create new obj production Run
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

      const newProductionRun = new Production(productionRunData); // create instance
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

export const getProductionMongoDB = async (req, res) => {
   try {
      const productions = await Production.find({});

      res.status(200).json({ data: productions });
   } catch (error) {
      return res
         .status(500)
         .json({ error: "Failed to retrieve production runs" });
   }
};

export const getProductionMongoDBRun = async (req, res) => {
   try {
      // Get the production run by id
      const productionRun = await Production.findById(req.params.id);

      // Document not found
      if (!productionRun) {
         return res.status(404).json({
            error: "Production run not found",
         });
      }
      res.status(200).json({ data: productionRun });
   } catch (error) {
      return res
         .status(500)
         .json({ error: "Failed to retrieve production run" });
   }
};

export const updateProductionRunMongoDB = async (req, res) => {
   try {
      res.status(200).json({ data: "End point works" });
   } catch (error) {
      return res.status(500).json({ error: "Failed to Update production run" });
   }
};
