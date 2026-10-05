import { Request, Response, NextFunction} from 'express'

interface MyError extends Error {
    status: number
}

export function errorHandler(err: MyError, req: Request, res: Response, next: NextFunction) {
    console.error(err)
    const status = err.status
    const message = err.message || "Internal server error"
    res.status(status).json({err: message})
}