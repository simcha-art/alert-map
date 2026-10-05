import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewAlert from "./pages/NewAlert";
import MainLayout from "./components/MainLayout";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/new-alert" element={<NewAlert />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
