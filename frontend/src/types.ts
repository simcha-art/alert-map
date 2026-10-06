interface Alert {
    id: string
    displayName: string,
    description: string,
    priority: "Low" | "Medium" | "High" | "Critical",
    arena: "North" | "South" | "Center",
    status: "Active" | "Handled",
    lon: number,
    lat: number,
    createdAt: string
}

interface MyError extends Error {
    status?: number
}

interface User {
    username: string
    email: string
    role: "arena_user" | "general_user" | "admin"
    assignedArena: "North" | "South" | "Center" | "All"
}


export type { Alert, MyError, User }
