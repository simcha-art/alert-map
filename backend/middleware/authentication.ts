import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import env from 'dotenv'
import type { MyError } from "../types";
env.config()

function authentication(req: Request, res: Response, next: NextFunction) {
    try {

        const auth = req.headers.authorization
        const token = auth?.split(" ")[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        next()
    } catch (error) {
        res.status(401).json({ err: "token not correct or expired" })
    }
}

function adminAuth(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.user.role !== "admin") {
            const err: MyError = new Error("unauthorized")
            err.status = 403
            throw err
        }
        next()
    } catch (error) {
        next(error)
    }
}

export { authentication, adminAuth }