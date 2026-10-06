import express from "express";
import {
    createNewAlert,
    updateAlert,
    deleteAlert,
    getAllAlerts,
    getAlertById,
} from "../controller/alertsController.ts";

export const route = express.Router();

route.get("/", getAllAlerts);
route.get("/:id", getAlertById);
route.post("/", createNewAlert);
route.delete("/:id", deleteAlert);
route.put("/:id", updateAlert);
