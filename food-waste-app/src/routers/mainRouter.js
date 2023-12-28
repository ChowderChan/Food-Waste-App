import express from "express";
import { sequelize } from "../sequelize/sequelize.js";

import { FoodItem } from "../models/FoodItem.js";
import { User } from "../models/User.js";

// ********************
// The role of this scripting file is
// to group multiple routers and mount them to
// different paths in the main app
// ********************

const router = express.Router();

// Mount the mainRouter => all the routes defined there will start
// with /main/..

// Controllers ... ( GET, POST )

export { router };