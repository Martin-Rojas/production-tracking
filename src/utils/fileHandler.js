import fs from "node:fs";

const loadProduction = () => {
   try {
      const dataBuffer = fs.readFileSync(`data/production.json`);
      const dataJson = dataBuffer.toString();

      return JSON.parse(dataJson);
   } catch (error) {
      return [];
   }
};

const saveProductionRun = (productionRun) => {
   const dataJSON = JSON.stringify(productionRun);
   fs.writeFileSync(`data/production.json`, dataJSON);
};

export { loadProduction, saveProductionRun };
