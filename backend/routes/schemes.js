import express from "express";
import { getSchemes } from "../controllers/schemeController.js";

const router = express.Router();

router.post("/", getSchemes);

export default router;
