import { useEffect, useState } from "react";
import type { MyError } from "../../types";

export function useFetch<T>(endUrl: string) {
    const token = localStorage.getItem("token")
    const baseUrl = "http://localhost:3000/api/auth/"
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    const [data, setData] = useState<T>()

    useEffect(() => {
        console.log("fetching...")
        fetch(baseUrl + endUrl, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
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
    }, [endUrl])

    return {loading, error, data}

}