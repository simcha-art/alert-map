import express from "express";

export const route = express.Router()

route.get("/", (req, res) => res.send("not implemented"));
route.get("/:id", (req, res) => res.send("not implemented"));
route.post("/", (req, res) => res.send("not implemented"));
route.delete("/:id", (req, res) => res.send("not implemented"))
route.put("/:id", (req, res) => res.send("not implemented"))

