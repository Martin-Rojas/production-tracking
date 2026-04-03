import { loadProduction, saveProductionRun } from "../utils/fileHandler.js";

export const createProductionRun = (req, res) => {
   const { operator, wireType, coilsProduced, palletId } = req.body;

   // business calculations
   const boxesUsed = coilsProduced / 6;
   const zipTiesUsed = coilsProduced * 4;
   const palletsCreated = boxesUsed / 63;

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
   let production = loadProduction();
   production.push(productionRun);
   saveProductionRun(production);

   res.status(201).json(productionRun);
};

export const getProduction = (req, res) => {
   let production = loadProduction();
   res.status(201).json(production);
};

export const getProductionRun = (req, res) => {
   let production = loadProduction();
   const productionRunId = req.params.id;

   const requestProductionRun = production.filter(
      (productionRun) => productionRunId === productionRun.id,
   );

   if (requestProductionRun.length !== 0) {
      res.status(200).json(requestProductionRun);
   } else {
      res.status(404).json({ error: `Production Run not found` });
   }
};

export const deleteProductionRun = (req, res) => {
   /** 1. load all production runs */
   const production = loadProduction();

   // 2. find the item to delete
   const productionRunId = req.params.id;

   const productionRunFound = production.find(
      (productionRun) => productionRun.id === productionRunId,
   );

   // 3. if not found → 404
   if (!productionRunFound) {
      return res.status(404).json({ error: "Production Run not found" });
   }
   // 4. remove it
   const updatedProduction = production.filter(
      (productionRun) => productionRun.id !== productionRunFound.id,
   );
   // 5. save updated array
   saveProductionRun(updatedProduction);
   // 6. return deleted object */
   return res.status(200).json(productionRunFound);
};
