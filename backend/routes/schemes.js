import express from "express";
import { getSchemes } from "../controllers/schemesController.js";

const router = express.Router();

// POST endpoint for getting schemes based on user input
router.post("/", getSchemes);

export default router;
