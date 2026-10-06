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

export type { Alert, MyError }
