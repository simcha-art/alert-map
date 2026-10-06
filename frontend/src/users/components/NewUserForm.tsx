import { useState } from "react"

`username: string
    email: string
    role: "arena_user" | "general_user" | "admin"
    assignedArena: "North" | "South" | "Center" | "All"
`
function NewUserForm() {
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    function createNew(data) {
        setLoading(true)
        setError("")
        setSuccess(false)
        fetch(`http://localhost:3000/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (!res.ok) {
                const err = new Error(`Http Error, status: ${res.status}, message: ${res.json().then(err => err.err)}`)
                err.status = res.status
                throw err
            }
            return res.json()
        })
        .then(data => setSuccess(true))
        .catch(err => {
            console.log(err)
            setError(err)
        })
        .finally(() => setLoading(false))
    }
  return (
    <form onSubmit={e => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const data = Object.fromEntries(formData)
        createNew(data)
    }}>
        <label htmlFor="username">user name</label>
        <input type="text" name="username" id="username" required/>
        <label htmlFor="email">email</label>
        <input type="email" name="email" id="email" required/>
        <label htmlFor="role">role</label>
        <select name="role" id="role">
            <option value="arena_user">arena user</option>
            <option value="general_user">general user</option>
            <option value="admin">admin</option>
        </select>
        <label htmlFor="assignedArena">assigned arena</label>
        <select name="assignedArena" id="assignedArena">
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="Center">Center</option>
            <option value="All">All</option>
        </select>
        <button type="submit" disabled={loading}>{loading ? "loading...": "create"}</button>
        {error && <p>{error}</p>}
        {success && <p>user created successfully</p>}
    </form>
  )
}

export default NewUserForm