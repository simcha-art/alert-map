import express from "express";
import {
    createNewUser,
    deleteUser,
    getAllUsers,
    login,
    getActiveUser,
} from "../controller/usersController.ts";

export const route = express.Router();

route.post("/login", login)
route.get("/users", getAllUsers);
route.get("/me", getActiveUser);
route.post("/register", createNewUser);
route.delete("/users/:id", deleteUser);
