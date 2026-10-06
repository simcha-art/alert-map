import type { Request, Response, NextFunction } from 'express'
import { repo } from '../repo/alertsRepo.ts'
import z from 'zod'
import type { Alert, MyError } from '../types.js'
import { validUpdate, ALERT_FEILDS } from "../service/alertsService.ts"
import { ObjectId } from 'mongodb'

const AlertSchema = z.object({
    displayName: z.string(),
    description: z.string(),
    priority: z.enum(["Low", "Medium", "High", "Critical"]),
    arena: z.enum(["North", "South", "Center"]),
    status: z.enum(["Active", "Handled"]),
    lon: z.number(),
    lat: z.number(),
    createdAt: z.string()
})



async function getAllAlerts(req: Request, res: Response, next: NextFunction) {
    try {
        let alerts: Alert[] = await repo.getAll()
        if (req.user.assignedArena !== "All") {
            alerts = alerts.filter(alert => alert.arena === req.user.assignedArena)
        }
        res.json({ data: alerts })
    } catch (error) {
        next(error)
    }
}

async function getAlertById(req: Request, res: Response, next: NextFunction) {
    try {
        let err: MyError;
        const { id } = req.params
        // validation that id can be transmitted to objectId
        try {
            const _id = new ObjectId(id)
        } catch (error) {
            err = new Error("Invalid id, id is a string of ObjectId")
            err.status = 422
            throw err
        }

        const doc: Alert = await repo.getById(id as string)
        if (!doc) {
            err = new Error(`alert ${id} not found`)
            err.status = 404
            throw err
        }
        if (!["All", req.user.assignedArena].includes(doc.arena)) {
            err = new Error("permission denied, this alert is out of your arena")
            err.status = 403
            throw err
        }
        res.json({ data: doc })
    } catch (error) {
        next(error)
    }
}

async function createNewAlert(req: Request, res: Response, next: NextFunction) {
    try {
        let err: MyError;
        // יוצא מנקודת הנחה שחייל זירה ואדמין יכול לפתוח התראות וחייל כללי לא
        if (req.user.role === "general_user") {
            err = new Error("permission denied")
            err.status = 403
            throw err
        }
        const result = AlertSchema.safeParse(req.body)
        if (!result.success) {
            err = new Error(result.error.message)
            err.status = 400
            throw err
        }
        const newAlert = await repo.create(result.data)
        res.status(201).json({ data: newAlert })
    } catch (error) {
        next(error)
    }
}

async function updateAlert(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        let err: MyError;
        try {
            const _id = new ObjectId(id)
        } catch (error) {
            err = new Error("Invalid id, id is a string of ObjectId")
            err.status = 422
            throw err
        }

        // בודק אם זה חייל כללי. אם כן => מותר לו לעדכן רק סטטוס ולא דברים אחרים
        if (req.user.role === "general_user") {
            const { status } = req.body
            if (!status || Object.keys(req.body).length > 1) {
                err = new Error("permission denied, you can update only status")
                err.status = 403
                throw err
            }
        }

        const validData = validUpdate(req.body)
        if (!validData) {
            err = new Error(`Invalid feild, only [${ALERT_FEILDS}] are valid`)
            err.status = 400
            throw err
        }
        const success = await repo.update(id as string, req.body)
        if (!success) {
            const err: MyError = new Error(`alert ${id} not found`)
            err.status = 404
            throw err
        }
        res.json({ success })
    } catch (error) {
        next(error)
    }
}

async function deleteAlert(req: Request, res: Response, next: NextFunction) {
    try {
        let err: MyError;
        // מונע מחייל כללי למחוק התראות כי זה לא בסמכותו, מותר לו רק לצפות או לשנות סטטוס
        if (req.user.role === "general_user") {
            err = new Error("permission denied")
            err.status = 403
            throw err
        }

        const { id } = req.params
        try {
            const _id = new ObjectId(id)
        } catch (error) {
            err = new Error("Invalid id, id is a string of ObjectId")
            err.status = 422
            throw err
        }

        const success = await repo.delete(id as string)
        if (!success) {
            err = new Error(`alert ${id} not found`)
            err.status = 404
            throw err
        }

        res.json({ success })

    } catch (error) {
        next(error)
    }
}

export { getAlertById, getAllAlerts, createNewAlert, updateAlert, deleteAlert }