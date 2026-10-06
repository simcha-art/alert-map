import { useState } from "react";
import type { Alert } from "../types";
import AlertsMap from "./AlertsMap";
import { useAlertsStore } from "../store/useAlertsStore";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import "./css/AlertDetails.css"

function AlertDetailed() {
    const { id } = useParams();
    const result = useFetch<Alert>(id);
    const alert = result.data;

    const navigate = useNavigate();
    const removeAlert = useAlertsStore((state) => state.removeAlert);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    function deleteAlert() {
        setLoading(true);
        setError("");
        setSuccess(false);
        fetch("http://localhost:3000/api/alerts/" + alert?.id, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(
                        `Http Error!, Status ${res.status} message: ${res.json().then((err) => err.err)}`,
                    );
                }
                return res.json();
            })
            .then((data) => setSuccess(data.success))
            .then(() => removeAlert(alert.id))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }
    return (
        <>
        {result.loading && <p>loading...</p>}
        {result.error && <p>{error}</p>}
        {alert && 
            <article className="alert-details-card">
                <header className="alert-details-header">
                    <p>id: {alert.id}</p>
                    <p>name: {alert.displayName}</p>
                    <p>created at: {alert.createdAt}</p>
                </header>
                <main className="alert-details-main">
                    <div className="details">
                        <h2>Priority: {alert.priority}</h2>
                        <h3>Arena: {alert.arena}</h3>
                        <h3>Status: {alert.status}</h3>
                        <p>{alert.description}</p>
                    </div>
                    <div className="btns">
                        <button
                            disabled={loading}
                            onClick={() => deleteAlert()}
                        >
                            Delete
                        </button>
                        <button onClick={() => navigate(`/update/${alert.id}`)}>
                            Update
                        </button>
                        {loading && <p>loading...</p>}
                        {error && <p>Error: {error}</p>}
                        {success && <p>Alert deleted successfully</p>}
                    </div>
                </main>
                <footer className="alert-details-footer-map">
                    <AlertsMap alerts={[alert]} height={200}/>
                </footer>
            </article>
}
        </>
    );
}

export default AlertDetailed;
