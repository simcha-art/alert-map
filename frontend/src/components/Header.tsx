import { Link, useNavigate } from "react-router-dom";
import "./css/Header.css";
import { useFetch } from "../users/hooks/useFetch.ts";
import type { User } from "../types.ts";
import { use } from "react";

function Header() {
    const { loading, error, data } = useFetch<User>("me");
    const user = data;
    const isAuthNew = ["admin", "arena_user"].includes(user?.role ?? "");
    const isAdmin = user?.role === "admin";
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }
    if (loading) return <p>loading...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div className="header-container">
            {user && (
                <div className="user-details-container">
                    <p>Name: {user.username}</p>
                    <p> Role: {user.role}</p>
                </div>
            )}
            <nav className="header-nav">
                <Link to={"/"}>Home</Link>
                {isAuthNew && <Link to={"/new-alert"}>New</Link>}
                {isAdmin && <Link to={"/admin"}>Admin-Page</Link>}
                <button onClick={logout}>Logout</button>
            </nav>
        </div>
    );
}

export default Header;
