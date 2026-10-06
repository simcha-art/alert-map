import type { MyError } from "../types";

export const ALERT_FEILDS = [
    "displayName",
    "description",
    "arena",
    "priority",
    "status",
    "lat",
    "lon"
]

const STRING_FEILD = ["displayName", "description", "arena", "priority", "status"]

const NUMBER_FEILDS = ["lat", "lon"]

export function validUpdate(body: object): Boolean {
    // validation body have feilds
    let err: MyError;
    if (Object.keys(body).length < 1) {
        err = new Error("no data was given")
    }
    // validation all feild are valid
    for (let feild in body) {
        if (!ALERT_FEILDS.includes(feild)) {
            err = new Error(`feild ${feild} is invalid`)
        }
        if (STRING_FEILD.includes(feild)) {
            if (typeof body[feild] !== "string") {
                err = new Error(`feild ${feild} must be of type string`)
            }
        }
        if (NUMBER_FEILDS.includes(feild)) {
            if (typeof body[feild] !== "number") {
                err = new Error(`feild ${feild} must be of type number`)
            }
        }

    }
    if (err) {
        err.status = 400
        throw err
    }

    return true
}

