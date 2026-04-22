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

const saveProductionRun = (data) => {
   const dataJSON = JSON.stringify(data, null, 2);
   fs.writeFileSync(`src/data/production.json`, dataJSON);
};

export { loadProduction, saveProductionRun };
