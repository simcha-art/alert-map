import express from "express";
import {
    createNewAlert,
    updateAlert,
    deleteAlert,
    getAllAlerts,
    getAlertById,
} from "../controller/alertsController.ts";
import { adminAuth, authentication } from "../middleware/authentication.ts";

export const route = express.Router();

route.get("/",authentication , getAllAlerts);
route.get("/:id", authentication, getAlertById);
route.post("/", authentication, createNewAlert);
route.delete("/:id", authentication ,deleteAlert);
route.put("/:id", authentication ,updateAlert);
