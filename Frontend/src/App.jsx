import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Collection from "./pages/Collection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Aboutus from "./pages/Aboutus";
import Mainpage from "./pages/Mainpage";
import Reservation from "./pages/Reservation";
import ProtectedRoute from "./components/ProtectedRoute";
import VerifyEmail from "./pages/VerifyEmail"; 

function App() {
    return (
        <Router>
            
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/Collection" element={<Collection />} />
                <Route path="/Reservation" element={<Reservation />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Aboutus" element={<Aboutus />} />
                
                // Email Verification Route //
                <Route path="/verify-email" element={<VerifyEmail />} />

                // Protect Mainpage //
                <Route path="/Mainpage" element={<ProtectedRoute><Mainpage /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
