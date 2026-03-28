import express from "express";
import { createProductionRun } from "../../controllers/productionController.js";

const router = express.Router();

router.post("/", createProductionRun);

export default router;
