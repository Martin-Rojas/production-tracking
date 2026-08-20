import express from "express";
import {
   createProductionRun,
   getProduction,
   getProductionRun,
   deleteProductionRun,
   updateProductionRun,
} from "../controllers/productionController.js";
import { createProductionMongoDB } from "../controllers/productionMongoController.js";

const router = express.Router();

router.post("/", createProductionRun);
router.get("/", getProduction);
router.get("/:id", getProductionRun);
router.delete("/:id", deleteProductionRun);
router.put("/:id", updateProductionRun);

// Routes to migrate to MongoDB
router.post("/mongoDB", createProductionMongoDB);

export default router;
