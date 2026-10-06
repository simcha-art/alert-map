import { useAlertsStore } from "../store/useAlertsStore.ts";
import type { Alert } from "../types.ts";
import AlertCard from "./AlertCard.tsx";

interface Props {
    alertsList: Alert[];
}

function AlertsList() {
    const show = useAlertsStore(state => state.show())
    return (
        <>
            {show.length > 0 ? (
                <ul>
                    {show.map((alert) => (
                        <AlertCard alert={alert} key={alert.id} />
                    ))}
                </ul>
            ) : (
                <p>There are no alerts yet</p>
            )}
        </>
    );
}

export default AlertsList;
