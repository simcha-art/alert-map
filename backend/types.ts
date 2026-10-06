interface Alert {
    displayName: string,
    description: string,
    priority: "Low" | "Medium" | "High" | "Critical",
    arena: "North" | "South" | "Center",
    status: "Active" | "Handled",
    lon: number,
    lat: number
}

interface MyError extends Error {
    status?: number
}

interface User {
    id?: string
    username: string
    password: string
    email: string
    role: "arena_user" | "general_user" | "admin"
    assignedArea: "North" | "South" | "Center" | "All"
}




export type { Alert, MyError, User }