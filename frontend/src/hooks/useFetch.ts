import { useEffect, useState } from "react";
import type { Alert, MyError } from "../types";

export function useFetch(id : string = "") {
    if (id) {
        id = "/" + id
    }
    const baseUrl = "http://localhost:3000/api/alerts"
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    const [data, setData] = useState<Alert | Alert[]>()

    useEffect(() => {
        fetch(baseUrl + id)
        .then(res => {
            if (!res.ok) {
                console.log({res})
                const err: MyError = new Error(`Http error, status: ${res.status}`)
                err.status = res.status
                throw err
            }
            return res.json()
        })
        .then(data => setData(data.data))
        .catch(error => {
            console.error(error)
            setError(error)
        })
        .finally(() => setLoading(false))
    }, [baseUrl])

    return {loading, error, data}

}