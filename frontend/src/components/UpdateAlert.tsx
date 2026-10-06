import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Alert } from "../types";
import { useState } from "react";
import { useAlertsStore } from "../store/useAlertsStore.ts";
import "./css/UpdateAlert.css";

function UpdateAlert() {
    const update = useAlertsStore((state) => state.updateAlert);
    const { id } = useParams();
    const result = useFetch<Alert>(id);
    const alert = result.data;
    console.log(alert);
    // const [displayName, setName] = useState<string>(alert?.displayName || "");
    // const [description, setDescription] = useState<string>(
    //     alert?.description || "",
    // );
    // const [priority, setPriority] = useState<
    //     "Low" | "Medium" | "High" | "Critical"
    // >(alert?.priority || "Low");
    // const [arena, setArena] = useState<"North" | "South" | "Center">(
    //     alert?.arena || "Center",
    // );
    // const [status, setStatus] = useState<"Active" | "Handled">(
    //     alert?.status || "Active",
    // );
    // const [lon, setLon] = useState<number>(alert?.lon || 0);
    // const [lat, setLat] = useState<number>(alert?.lat || 0);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState<boolean>(false);
    async function updateAlert(data) {
        try {
            setLoading(true);
            setError("");
            setSuccess(false);
            const response = await fetch(
                `http://localhost:3000/api/alerts/${alert?.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                },
            );
            if (!response.ok) {
                throw new Error(
                    `Alert update failed, status: ${response.status}, message: ${await response.json().then((err) => err.err)}`,
                );
            }

            setSuccess(await response.json().then((data) => data.success));
            update(alert?.id, data);
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            {result.loading && <p>loading...</p>}
            {result.error && <p>{result.error}</p>}
            {alert && (
                <div className="update-main-container">
                    {success && (
                        <p className="success-message">
                            Alert updated successfully
                        </p>
                    )}
                    {error && <p className="error-message">{error}</p>}
                    <form
                        className="update-alert-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.target;
                            console.log(e.target)
                            const formData = new FormData(form);
                            console.log(formData.get("displayName"))
                            const data = Object.fromEntries(formData)
                            data.lon = +data.lon
                            data.lat = +data.lat
                            console.log(data)
                            updateAlert(data);
                        }}
                    >
                        <label htmlFor="displayName">display name</label>
                        <input
                            type="text"
                            id="displayName"
                            name="displayName"
                            required
                            defaultValue={alert.displayName}
                            // onChange={(e) => setName(e.target.value)}
                            
                        />
                        <label htmlFor="description">description</label>
                        <textarea
                            rows={6}
                            id="description"
                            name="description"
                            defaultValue={alert.description}
                            required
                            // onChange={(e) => setDescription(e.target.value)}
                            
                        ></textarea>
                        <label htmlFor="priority">priority</label>
                        <select
                            id="priority"
                            name="priority"
                            // onChange={(e) => setPriority(e.target.value)}
                            
                            defaultValue={alert.priority}
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
                            name="arena"
                            // onChange={(e) => setArena(e.target.value)}
                            
                            defaultValue={alert.arena}
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
                            name="status"
                            // onChange={(e) => setStatus(e.target.value)}
                            
                            defaultValue={alert.status}
                            required
                        >
                            <option value="Active" defaultChecked>
                                Active
                            </option>
                            <option value="Handled">Handled</option>
                        </select>

                        <label htmlFor="lat">latitude</label>
                        <input
                            type="number"
                            step={0.001}
                            id="lat"
                            name="lat"
                            defaultValue={alert.lat}
                            // onChange={(e) => setLat(+e.target.value)}
                            
                            required
                        />

                        <label htmlFor="lon">longitude</label>
                        <input
                            type="number"
                            step={0.001}
                            id="lon"
                            name="lon"
                            defaultValue={alert.lon}
                            // onChange={(e) => setLon(+e.target.value)}
                            onSubmit={(e) => setLon(e.currentTarget.value)}
                            required
                        />

                        <button type="submit" disabled={loading}>
                            {loading ? "loading..." : "update"}
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

export default UpdateAlert;
