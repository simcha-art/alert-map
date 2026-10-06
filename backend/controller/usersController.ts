import type { Request, Response, NextFunction } from 'express'
import { repo } from '../repo/usersRepo.ts'
import z from 'zod'
import type { MyError, User } from '../types.js'
import { ObjectId } from 'mongodb'
import jwt from "jsonwebtoken"
import env from 'dotenv'

env.config()

const JWT_SECRET = process.env.JWT_SECRET
console.log(JWT_SECRET)

const UserSchema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.email(),
    role: z.enum(["arena_user", "general_user", "admin"]),
    assignedArea: z.enum(["North", "South", "Center", "All"])
})



async function getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
        res.json({ data: await repo.getAll() })
    } catch (error) {
        next(error)
    }
}

async function getActiveUser(req: Request, res: Response, next: NextFunction) {
    try {
        res.json({ data: req.user })
    } catch (error) {
        next(error)
    }
}

async function createNewUser(req: Request, res: Response, next: NextFunction) {
    try {
        const result = UserSchema.safeParse(req.body)
        if (!result.success) {
            const err: MyError = new Error(result.error.message)
            err.status = 400
            throw err
        }
        const newUser = await repo.create(result.data)
        res.status(201).json({ data: newUser })
    } catch (error) {
        next(error)
    }
}


async function deleteUser(req: Request, res: Response, next: NextFunction) {
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

        const success = await repo.delete(id as string)
        if (!success) {
            err = new Error(`User ${id} not found`)
            err.status = 404
            throw err
        }

        res.json({ success })

    } catch (error) {
        next(error)
    }
}

async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body
        const user: User = await repo.getByEmailAndPwd(email, password)
        const { username, role, assignedArea, } = user
        const payload = { username, email, role, assignedArea }
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string)
        if (!user) {
            const err: MyError = new Error(`Wrong email or password`)
            err.status = 404
            throw err
        }

        res.json({ data: accessToken })
    } catch (error) {
        next(error)
    }
}


export { getActiveUser, getAllUsers, createNewUser, deleteUser, login }