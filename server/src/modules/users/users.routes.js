import express  from "express";
import { createUserController, getAllUserController, getUserByIdController, updateUserByIdController } from "./user.controller.js";

export const userRoutes = express.Router()

userRoutes.route('/')
.get(getAllUserController)
.post(createUserController)
userRoutes.route('/:id')
.get(getUserByIdController)
.patch(updateUserByIdController)