import express from "express";
import {
   createProductionRun,
   getProduction,
   getProductionRun,
   deleteProductionRun,
} from "../controllers/productionController.js";

const router = express.Router();

router.post("/", createProductionRun);
router.get("/", getProduction);
router.get("/:id", getProductionRun);
router.delete("/:id", deleteProductionRun);

export default router;
