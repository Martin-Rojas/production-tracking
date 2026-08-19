import { loadProduction, saveProductionRun } from "../utils/fileHandler.js";
import { validateData } from "../utils/validateProduction.js";
import { calculateProduction } from "../utils/calculateProduction.js";

export const createProductionRun = (req, res) => {
   try {
      const error = validateData(req.body);

      if (error) {
         return res.status(400).json({ error });
      }

      const { operator, wireType, coilsProduced, palletId } = req.body;

      // business calculations
      const { boxesUsed, zipTiesUsed, palletsCreated } =
         calculateProduction(coilsProduced);

      // generate  id
      const id = `run_${Date.now()}`;

      // create date
      const date = new Date().toISOString().split("T")[0];

      const productionRun = {
         id,
         palletId,
         date,
         operator,
         wireType,
         coilsProduced,
         boxesUsed,
         zipTiesUsed,
         palletsCreated,
      };

      // Push and save productionRun
      const production = loadProduction();
      production.push(productionRun);
      saveProductionRun(production);

      res.status(201).json({ data: productionRun });
   } catch (error) {
      // return res.status(500).json({ error: "Server error" });
      console.log(error);
   }
};

export const getProduction = (req, res) => {
   try {
      const production = loadProduction();
      res.status(200).json({ data: production });
   } catch (error) {
      return res.status(500).json({ error: "Server error" });
   }
};

export const getProductionRun = (req, res) => {
   try {
      const production = loadProduction();
      const productionRunId = req.params.id;

      const productionRun = production.find(
         (productionRun) => productionRunId === productionRun.id,
      );

      if (productionRun) {
         res.status(200).json({ data: productionRun });
      } else {
         res.status(404).json({
            error: `Production run with id ${productionRunId} not found`,
         });
      }
   } catch {
      return res.status(500).json({ error: "Server error" });
   }
};

export const deleteProductionRun = (req, res) => {
   try {
      /** 1. load all production runs */
      const production = loadProduction();

      // 2. find the item to delete
      const productionRunId = req.params.id;

      const productionRunFound = production.find(
         (productionRun) => productionRun.id === productionRunId,
      );

      // 3. if not found → 404
      if (!productionRunFound) {
         return res.status(404).json({
            error: `Production run with id ${productionRunId} not found`,
         });
      }
      // 4. remove it
      const updatedProduction = production.filter(
         (productionRun) => productionRun.id !== productionRunFound.id,
      );
      // 5. save updated array
      saveProductionRun(updatedProduction);
      // 6. return deleted object */
      return res.status(200).json({ data: productionRunFound });
   } catch {
      return res.status(500).json({ error: "Server error" });
   }
};

export const updateProductionRun = (req, res) => {
   try {
      // Load production
      const production = loadProduction();
      const productionRunId = req.params.id;

      // Find the production run by id match
      const productionRunFound = production.find(
         (productionRun) => productionRun.id === productionRunId,
      );
      if (!productionRunFound) {
         return res.status(404).json({
            error: `Production run with id ${productionRunId} not found`,
         });
      }

      // Validate new productionRun data
      const error = validateData(req.body);

      if (error) {
         return res.status(400).json({ error });
      }

      const {
         operator: newOperator,
         wireType: newWireType,
         coilsProduced: newCoilsProduced,
         palletId: newPalletId,
      } = req.body;

      // Update Object
      productionRunFound.operator = newOperator;
      productionRunFound.wireType = newWireType;
      productionRunFound.coilsProduced = newCoilsProduced;
      productionRunFound.palletId = newPalletId;

      // Recalculate business values  calculations
      const { boxesUsed, zipTiesUsed, palletsCreated } =
         calculateProduction(newCoilsProduced);

      productionRunFound.boxesUsed = boxesUsed;
      productionRunFound.zipTiesUsed = zipTiesUsed;
      productionRunFound.palletsCreated = palletsCreated;

      // Save Updated Array
      saveProductionRun(production);

      res.status(200).json({ data: productionRunFound });
   } catch {
      return res.status(500).json({ error: "Server error" });
   }
};
