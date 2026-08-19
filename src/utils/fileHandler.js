import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productionPath = path.join(__dirname, "../data/production.json");

const loadProduction = () => {
   try {
      const dataBuffer = fs.readFileSync(productionPath);
      //const dataBuffer = fs.readFileSync(`src/data/production.json`);
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
