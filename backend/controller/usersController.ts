import type { Request, Response, NextFunction } from 'express'
import { repo } from '../repo/usersRepo.ts'
import z from 'zod'
import type { MyError } from '../types.js'
import { ObjectId } from 'mongodb'

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

async function getUserById(req: Request, res: Response, next: NextFunction) {
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

        const doc = await repo.getById(id as string)
        if (!doc) {
            err = new Error(`User ${id} not found`)
            err.status = 404
            throw err
        }
        res.json({ data: doc })
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

export { getUserById, getAllUsers, createNewUser, deleteUser }