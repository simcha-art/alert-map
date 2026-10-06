import { useState } from "react";
import AlertsList from "../components/AlertsList";
import { useFetch } from "../hooks/useFetch";
import type { Alert } from "../types";
import SearchBar from "../components/SearchBar";
import { useAlertsStore } from "../store/useAlertsStore";
import FilterBy from "../components/FilterBy";
import AlertsMap from "../components/AlertsMap";

function Home() {
    console.log("render Home");
    const { loading, error, data } = useFetch<Alert[]>();
    const initList = useAlertsStore((state) => state.initList);
    const showAll = useAlertsStore((state) => state.showAll);
    initList(data ?? []);
    showAll();

    if (loading) return <p className="loading-message">loading...</p>;
    if (error) return <p className="error-message">Error occured: {error}</p>;

    return (
        <>
            <h2>ALERTS LIST</h2>
            <SearchBar />
            <FilterBy filteredBy="arena" />
            <FilterBy filteredBy="priority" />
            <section className="alerts-show-container">
                <AlertsList />
            </section>
        </>
    );
}

export default Home;
