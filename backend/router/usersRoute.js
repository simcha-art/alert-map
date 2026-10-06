import express from "express";
import {
    createNewUser,
    deleteUser,
    getAllUsers,
    login,
    getActiveUser,
} from "../controller/usersController.ts";
import { adminAuth, authentication } from "../middleware/authentication.ts";

export const route = express.Router();

route.post("/login", login)
route.get("/users", authentication, adminAuth, getAllUsers);
route.get("/me", authentication, getActiveUser);
route.post("/register", authentication, adminAuth, createNewUser);
route.delete("/users/:id", authentication, adminAuth, deleteUser);
