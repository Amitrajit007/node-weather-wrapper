import express from "express";
const router = express.Router();

import { weatherController } from "../controllers/weather.controller.js";
router.get("/", weatherController);

//  export
export default router;
