// import the model
import Production from "../models/ProductionRun.js";
import { validateData } from "../utils/validateProduction.js";
import { calculateProduction } from "../utils/calculateProduction.js";
import { error } from "node:console";
import { VALID_WIRE_TYPES } from "../utils/productionConstants.js";
import { validateProductionUpdate } from "../utils/validateProduction.js";

// create a new document
export const createProductionMongoDB = async (req, res) => {
   try {
      // validate data
      const error = validateData(req.body);

      if (error) {
         return res.status(400).json({ error: error });
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
         data: newProductionRun,
      });
   } catch (error) {
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
      if (error.name === "CastError") {
         return res.status(400).json({
            error: "Invalid production run ID",
         });
      }
      return res
         .status(500)
         .json({ error: "Failed to retrieve production run" });
   }
};

export const updateProductionRunMongoDB = async (req, res) => {
   try {
      const error = validateProductionUpdate(req.body);

      if (error) {
         return res.status(400).json(error);
      }

      // Get the production run by id
      const productionRunFound = await Production.findById(req.params.id);

      if (!productionRunFound) {
         return res.status(404).json({ error: "Production Run Not Found" });
      }

      if (req.body.operator !== undefined) {
         productionRunFound.operator = req.body.operator;
      }
      if (req.body.wireType !== undefined) {
         productionRunFound.wireType = req.body.wireType;
      }
      if (req.body.palletId !== undefined) {
         productionRunFound.palletId = req.body.palletId;
      }

      if (req.body.coilsProduced !== undefined) {
         const coils = req.body.coilsProduced;
         if (productionRunFound.coilsProduced !== coils) {
            productionRunFound.coilsProduced = coils;
            // business calculations
            const { boxesUsed, zipTiesUsed, palletsCreated } =
               calculateProduction(productionRunFound.coilsProduced);

            productionRunFound.boxesUsed = boxesUsed;
            productionRunFound.zipTiesUsed = zipTiesUsed;
            productionRunFound.palletsCreated = palletsCreated;
         }
      }

      // Save updated produciton run
      await productionRunFound.save();
      res.status(200).json({ data: productionRunFound });
   } catch (error) {
      if (error.name === "CastError") {
         return res.status(400).json({
            error: "Invalid production run ID",
         });
      }
      return res.status(500).json({ error: "Failed to Update production run" });
   }
};

export const deleteProductionRunMongoDB = async (req, res) => {
   try {
      // Get the production run by id
      const productionRunFound = await Production.findByIdAndDelete(
         req.params.id,
      );

      if (!productionRunFound) {
         return res.status(404).json({ error: "Production Run Not Found" });
      }

      res.status(200).json({
         data: productionRunFound,
      });
   } catch (error) {
      if (error.name === "CastError") {
         return res.status(400).json({
            error: "Invalid production run ID",
         });
      }
      return res.status(500).json({ error: "Failed to delete production run" });
   }
};
