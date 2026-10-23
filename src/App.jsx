import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import CommunityDashboard from "./pages/CommunityDashboard";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
             path="/community"
               element={<CommunityDashboard />}
                 />

               

            </Routes>

        </BrowserRouter>

    );

}

export default App;
