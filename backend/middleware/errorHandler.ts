import type { Request, Response, NextFunction} from 'express'
import type { MyError } from '../types.js'

export function errorHandler(err: MyError, req: Request, res: Response, next: NextFunction) {
    console.error(err)
    const status = err.status || 500
    const message = err.message || "Internal server error"
    res.status(status).json({err: message})
}