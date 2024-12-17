import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MapPage from "../pages/MapPage";
import IncidentListPage from "../pages/IncidentListPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/list" element={<IncidentListPage incidents={[]} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
