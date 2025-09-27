import express from "express";
const router = express.Router();

import { forecastController } from "../controllers/forecast.controller.js";
router.get("/", forecastController);

//  export
export default router;
