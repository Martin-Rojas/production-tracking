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
      // Check for invalid fields
      const validFields = ["operator", "wireType", "coilsProduced", "palletId"];

      const requestedFields = Object.keys(req.body);

      const invalidFields = requestedFields.filter(
         (field) => !validFields.includes(field),
      );

      if (invalidFields.length > 0) {
         return res.status(400).json({
            error: "Invalid field",
            fields: invalidFields,
         });
      }
      // Get the production run by id
      const productionRunFound = await Production.findById(req.params.id);

      if (!productionRunFound) {
         return res.status(404).json({ error: "Production Run Not Found" });
      }
      // Check for any invalid field

      if (req.body.operator !== undefined) {
         productionRunFound.operator = req.body.operator;
      }
      if (req.body.wireType !== undefined) {
         productionRunFound.wireType = req.body.wireType;
      }
      if (req.body.coilsProduced !== undefined) {
         if (productionRunFound.coilsProduced !== req.body.coilsProduced) {
            productionRunFound.coilsProduced = req.body.coilsProduced;
            // business calculations
            const { boxesUsed, zipTiesUsed, palletsCreated } =
               calculateProduction(productionRunFound.coilsProduced);

            productionRunFound.boxesUsed = boxesUsed;
            productionRunFound.zipTiesUsed = zipTiesUsed;
            productionRunFound.palletsCreated = palletsCreated;
         }
      }
      if (req.body.palletId !== undefined) {
         productionRunFound.palletId = req.body.palletId;
      }

      // Save updated produciton run
      await productionRunFound.save();
      res.status(200).json({ data: productionRunFound });
   } catch (error) {
      return res.status(500).json({ error: "Failed to Update production run" });
   }
};
