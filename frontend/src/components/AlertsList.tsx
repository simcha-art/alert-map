import { useFetch } from "../hooks/useFetch.ts";
import type { Alert } from "../types.ts";
import AlertCard from "./AlertCard.tsx";
function AlertsList() {
    const result = useFetch();
    const { loading, error } = result;
    let data = result.data as Alert[];

    if (loading) return <p className="loading-message">loading...</p>;
    if (error) return <p className="error-message">Error occured: {error}</p>;

    return (
        <>
            {data.length > 0 ? (
                <ul>
                    {data.map((alert) => {
                        return <AlertCard alert={alert} key={alert.id} />;
                    })}
                </ul>
            ) : (
                <p>There are no alerts yet</p>
            )}
        </>
    );
}

export default AlertsList;
