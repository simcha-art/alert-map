import { useState } from "react";
import { useAlertsStore } from "../store/useAlertsStore";

interface Prop {
    filteredBy: string;
}

function FilterBy({ filteredBy }: Prop) {
    const [filter, setFilter] = useState<string>("");
    const filterByArena = useAlertsStore((state) => state.filterByArena);
    const filterByPriority = useAlertsStore((state) => state.filterByPriority);
    const showAll = useAlertsStore((state) => state.showAll);
    return (
        <form className="filter-form" onSubmit={e => {
            e.preventDefault()
            if (filteredBy === "arena") {
                filterByArena(filter)
            } 
            if (filteredBy === "priority") {
                filterByPriority(filter)
            }
        }}>
            <label htmlFor="filter">filter by {filteredBy}</label>
            <input
                type="text"
                id="filter"
                required
                value={filter}
                onChange={(e) => {
                    setFilter(e.target.value);
                    if (!e.target.value) {
                        showAll();
                    }
                }}

            />
            <button type="submit">filter</button>
        </form>
    );
}

export default FilterBy;
