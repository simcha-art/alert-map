import { useAlertsStore } from "../store/useAlertsStore.ts";
import type { Alert } from "../types.ts";
import AlertCard from "./AlertCard.tsx";
import AlertsMap from "./AlertsMap.tsx";
import "./css/AlertsList.css";

interface Props {
    alertsList: Alert[];
}

function AlertsList() {
    const show = useAlertsStore((state) => state.show());
    return (
        <div className="alerts-list-container">
            {show.length > 0 ? (
                <ul className="list-container">
                    {show.map((alert) => (
                        <AlertCard alert={alert} key={alert.id} />
                    ))}
                </ul>
            ) : (
                <p>There are no alerts yet</p>
            )}
            <div className="map-container">
                <AlertsMap alerts={show} className="map" height={520} />
            </div>
        </div>
    );
}

export default AlertsList;
