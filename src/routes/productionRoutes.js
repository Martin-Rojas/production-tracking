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
   updateProductionRunMongoDB,
   deleteProductionRunMongoDB,
} from "../controllers/productionMongoController.js";

const router = express.Router();

// Routes to migrate to MongoDB
router.post("/mongoDB", createProductionMongoDB);
router.get("/mongoDB", getProductionMongoDB);
router.get("/mongoDB/:id", getProductionMongoDBRun);
router.patch("/mongoDB/:id", updateProductionRunMongoDB);
router.delete("/mongoDB/:id", deleteProductionRunMongoDB);

export default router;
