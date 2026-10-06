import { useState } from "react";
import { useAlertsStore } from "../store/useAlertsStore";

function SearchBar() {
    const [name, setName] = useState<string>("");
    const search = useAlertsStore((state) => state.searchByName);
    const showAll = useAlertsStore((state) => state.showAll);
    return (
        <form
            className="Search-bar-container"
            onSubmit={(e) => {
                e.preventDefault();
                search(name);
                }
            }
        >
            <label htmlFor="search">Search by name</label>
            <input
                type="text"
                id="search"
                required
                placeholder="alert's display name"
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                    if (!e.target.value) {
                        showAll()
                    }
                }}
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;
