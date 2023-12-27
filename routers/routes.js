import express from "express";
import * as moviesController from "../Controllers/moviesController.js";

const router = express.Router();

// Controllers ... ( GET, POST )

export { router as moviesRouter };