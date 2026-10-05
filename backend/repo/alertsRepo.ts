import { ObjectId } from "mongodb";
import { collection } from "../db/db-conn.js";
import type { Alert, MyError } from "../types.js";



export const repo = {
    create: async (alert: Alert) => {
        try {
            const result = await collection?.insertOne(alert)
            alert._id = result?.insertedId.toString()
            return alert
        } catch (error) {
            console.error("Error while inserting to mongodb")
            console.error(error)
        }
    },
    update: async (id: string, data: object) => {
        try {
            const _id = new ObjectId(id)
            const result = await collection?.updateOne({ _id }, { $set: data })
            return result.modifiedCount > 0
        } catch (error) {
            console.error('Error while updating to mongodb ')
            console.error(error)
        }
    },
    delete: async (id: string) => {
        try {
            const _id = new ObjectId(id)
            const result = await collection?.deleteOne({ _id })
            return result.deletedCount > 0
        } catch (error) {
            console.error("Error while deleting from mongodb")
            console.error(error)
        }
    },
    getAll: async () => {
        const result = await collection?.find()
        const docsList = await result?.toArray()
        return docsList?.map(doc => ({...doc, id: doc._id.toString()}))
    },
    getById: async (id: string) => {
        const _id = new ObjectId(id)
        const doc = await collection?.findOne({ _id })
        if (!doc) {
            return false
        }
        return {...doc, id: doc?._id.toString()}
    },
}
