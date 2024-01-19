import express from "express";
import { FoodItem } from "../models/FoodItem.js";
import { User } from "../models/User.js";

const usersRouter = express.Router()

/**
 * GET all users from the database.
 */
usersRouter.get('/allUsers', async (request, response, next) => {
    try {
      const users = await User.findAll()
      if (users.length > 0) {
        response.json(users)
      } else {
        response.sendStatus(204)
      }
    } catch (error) {
      next(error)
    }
  })