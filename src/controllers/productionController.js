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
