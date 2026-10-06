import { ObjectId } from "mongodb";
import { usersCollection } from "../db/db-conn.js";
import type { User } from "../types.js";



export const repo = {
    create: async (user: User) => {
        try {
            const result = await usersCollection?.insertOne(user)
            user.id = result?.insertedId.toString()
            return user
        } catch (error) {
            console.error("Error while inserting to mongodb")
            console.error(error)
        }
    },
    update: async (id: string, data: object) => {
        try {
            const _id = new ObjectId(id)
            const result = await usersCollection?.updateOne({ _id }, { $set: data })
            return result.modifiedCount > 0
        } catch (error) {
            console.error('Error while updating to mongodb ')
            console.error(error)
        }
    },
    delete: async (id: string) => {
        try {
            const _id = new ObjectId(id)
            const result = await usersCollection?.deleteOne({ _id })
            return result.deletedCount > 0
        } catch (error) {
            console.error("Error while deleting from mongodb")
            console.error(error)
        }
    },
    getAll: async () => {
        const result = await usersCollection?.find()
        const docsList = await result?.toArray()
        return docsList?.map(doc => ({...doc, id: doc._id.toString()}))
    },
    getById: async (id: string) => {
        const _id = new ObjectId(id)
        const doc = await usersCollection?.findOne({ _id })
        if (!doc) {
            return false
        }
        return {...doc, id: doc?._id.toString()}
    },
}
