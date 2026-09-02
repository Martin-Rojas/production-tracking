import express from "express";
import {
   createProductionRun,
   getProduction,
   getProductionRun,
   deleteProductionRun,
   updateProductionRun,
} from "../controllers/productionController.js";
import {
   createProductionMongoDB,
   getProductionMongoDB,
   getProductionMongoDBRun,
} from "../controllers/productionMongoController.js";

const router = express.Router();

// Routes to migrate to MongoDB
router.post("/mongoDB", createProductionMongoDB);
router.get("/mongoDB", getProductionMongoDB);
router.get("/mongoDB/:id", getProductionMongoDBRun);

router.post("/", createProductionRun);
router.get("/", getProduction);
router.get("/:id", getProductionRun);
router.delete("/:id", deleteProductionRun);
router.put("/:id", updateProductionRun);

export default router;
