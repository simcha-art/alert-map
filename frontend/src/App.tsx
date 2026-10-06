import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewAlert from "./pages/NewAlert";
import MainLayout from "./components/MainLayout";
import AlertDetailed from "./components/AlertDetailed";
import UpdateAlert from "./components/UpdateAlert";
import LoginPage from "./users/pages/LoginPage";
import Protected from "./pages/Protected";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<Protected />}>
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/new-alert" element={<NewAlert />} />
                            <Route
                                path="/details/:id"
                                element={<AlertDetailed />}
                            />
                            <Route
                                path="/update/:id"
                                element={<UpdateAlert />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
