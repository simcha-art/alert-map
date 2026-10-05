import { Outlet } from "react-router-dom";
import Header from "./Header";
import "./css/MainLayout.css";

function MainLayout() {
    return (
        <>
            <div className="layout-body">
                <header className="layout-header">
                    <Header />
                </header>
                <main className="layout-main">
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default MainLayout;
