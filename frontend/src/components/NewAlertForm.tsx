import { useState } from "react";
import type { Alert } from "../types.ts";

function NewAlertForm() {
    const [displayName, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [priority, setPriority] = useState<
        "Low" | "Medium" | "High" | "Critical" | ""
    >("");
    const [arena, setArena] = useState<"North" | "South" | "Center" | "">("");
    const [status, setStatus] = useState<"Active" | "Handled" | "">("");
    const [lon, setLon] = useState<number>(0);
    const [lat, setLat] = useState<number>(0);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState<Alert | null>(null);
    async function createNewAlert() {
        try {
            setLoading(true);
            setError("");
            setData(null);
            const response = await fetch("http://localhost:3000/api/alerts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    displayName,
                    description,
                    arena,
                    priority,
                    status,
                    lat,
                    lon,
                }),
            });
            if (!response.ok) {
                throw new Error(
                    `Alert creation failed, status: ${response.status}, message: ${await response.json().then((err) => err.err)}`,
                );
            }

            setData(await response.json());
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
            setName("");
            setDescription("");
            setArena("");
            setPriority("");
            setStatus("");
            setLat(0);
            setLon(0);
        }
    }
    return (
        <>
            {data && <p className="success-message">Alert added successfully</p>}
            {error && <p className="error-message">{error}</p>}
            <form
                className="new-alert-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    createNewAlert();
                }}
            >
                <label htmlFor="name">display name</label>
                <input
                    type="text"
                    id="name"
                    required
                    value={displayName}
                    onChange={(e) => e.target.value}
                />
                <label htmlFor="description">description</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="priority">priority</label>
                <select
                    id="priority"
                    onChange={(e) => setPriority(e.target.value)}
                    value={priority}
                    required
                >
                    <option value="Low" defaultChecked>
                        Low
                    </option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                </select>

                <label htmlFor="arena">arena</label>
                <select
                    id="arena"
                    onChange={(e) => setArena(e.target.value)}
                    value={arena}
                    required
                >
                    <option value="North" defaultChecked>
                        North
                    </option>
                    <option value="South">South</option>
                    <option value="Center">Center</option>
                </select>
                <label htmlFor="arena">arena</label>
                <select
                    id="arena"
                    onChange={(e) => setArena(e.target.value)}
                    value={arena}
                    required
                >
                    <option value="North" defaultChecked>
                        North
                    </option>
                    <option value="South">South</option>
                    <option value="Center">Center</option>
                </select>

                <label htmlFor="status">status</label>
                <select
                    id="status"
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                    required
                >
                    <option value="Active" defaultChecked>
                        Active
                    </option>
                    <option value="Handled">Handled</option>
                </select>

                <label htmlFor="lat">latitude</label>
                <input
                    type="range"
                    id="lat"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    required
                />

                <label htmlFor="lon">longitude</label>
                <input
                    type="range"
                    id="lon"
                    value={lon}
                    onChange={(e) => setLon(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "loading..." : "send"}
                </button>
            </form>
        </>
    );
}

export default NewAlertForm;
