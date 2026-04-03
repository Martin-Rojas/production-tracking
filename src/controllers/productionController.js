import { loadProduction, saveProductionRun } from "../utils/fileHandler.js";

export const createProductionRun = (req, res) => {
   try {
      // Validate Request Exists
      if (!req.body || Object.keys(req.body).length === 0) {
         return res.status(400).json({ error: "Request body is required" });
      }

      // Validate Request Exists
      if (
         req.body.operator !== "" &&
         req.body.wireType !== "" &&
         !req.body.coilsProduced &&
         req.body.palletId !== ""
      ) {
         return res.status(400).json({ error: "All fields must be required" });
      }

      // Validate Wire Type
      const validWireTypes = ["316/045", "302/038", "302/045", "430/045"];
      if (!validWireTypes.includes(req.body.wireType)) {
         return res.status(400).json({ error: "Invalid wire type" });
      }

      // Validate coilsProduced
      const coils = Number(req.body.coilsProduced);
      if (!Number.isFinite(coils) || coils < 0) {
         return res.status(400).json({
            error: "Invalid coil count",
         });
      }

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
   } catch (error) {
      return res.status(500).json({ error: "Server error" });
   }
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
