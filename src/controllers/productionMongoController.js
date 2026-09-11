// import the model
import Production from "../models/ProductionRun.js";
import { validateData } from "../utils/validateProduction.js";
import { calculateProduction } from "../utils/calculateProduction.js";
import { error } from "node:console";

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
      if (Object.keys(req.body).length === 0) {
         return res.status(400).json({
            error: "Need to provide fields.",
         });
      }
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

      if (req.body.operator !== undefined) {
         // Validate operator
         if (req.body.operator === "") {
            return res.status(400).json({
               error: "Operator can not be blank",
            });
         }
         if (typeof req.body.operator !== "string") {
            return res.status(400).json({
               error: "Operator must be a string",
            });
         }
         productionRunFound.operator = req.body.operator;
      }
      if (req.body.wireType !== undefined) {
         // Validate Wire Type
         const validWireTypes = ["316/045", "302/038", "302/045", "430/045"];
         if (!validWireTypes.includes(req.body.wireType)) {
            return res.status(400).json({
               error: "Invalid wire type",
            });
         }
         productionRunFound.wireType = req.body.wireType;
      }
      if (req.body.coilsProduced !== undefined) {
         // Validate coilsProduced
         const coils = Number(req.body.coilsProduced);
         if (!Number.isFinite(coils) || coils < 0) {
            return res.status(400).json({
               error: "Invalid coil count",
            });
         }

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
      if (req.body.palletId !== undefined) {
         // Validate palletId
         if (req.body.palletId === "") {
            return res.status(400).json({
               error: "PalletId can not be blank",
            });
         }
         if (typeof req.body.palletId !== "string") {
            return res.status(400).json({
               error: "PalletId must be a string",
            });
         }
         productionRunFound.palletId = req.body.palletId;
      }

      // Save updated produciton run
      await productionRunFound.save();
      res.status(200).json({ data: productionRunFound });
   } catch (error) {
      return res.status(500).json({ error: "Failed to Update production run" });
   }
};
