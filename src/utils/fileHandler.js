import fs from "node:fs";

const loadProduction = () => {
   try {
      const dataBuffer = fs.readFileSync(`src/data/production.json`);
      const dataJson = dataBuffer.toString();

      return JSON.parse(dataJson);
   } catch (error) {
      return [];
   }
};

const saveProductionRun = (productionRun) => {
   const dataJSON = JSON.stringify(productionRun);
   fs.writeFileSync(`src/data/production.json`, dataJSON);
};

export { loadProduction, saveProductionRun };
