
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Collection from "./pages/Collection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Aboutus from "./pages/Aboutus";
import Mainpage from "./pages/Mainpage";
import Reservation from "./pages/Reservation";
import Forgotpass from "./components/Passcode";
import VerifyEmail from "./components/VerifyEmail";
import ResetPassword from "./components/Resetpassword";
import MyAccount from "./components/MyAccount";
import Favorites from "./components/Favorites";
import Rprocess from "./components/Rprocess";


import ProtectedRoute from "./components/ProtectedRoute";
 

function App() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/Passcode" element={<Forgotpass />} />
                    <Route path="/VerifyEmail" element={<VerifyEmail />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    
                    {/* Protect Mainpage Using ProtectedRoute */}
                    <Route path="/Mainpage" element={<Mainpage />} />
                    <Route path="/Collection" element={<Collection />} />
                    <Route path="/Reservation" element={<Reservation />} />
                    <Route path="/Aboutus" element={<Aboutus />} />
                    <Route path="/Rprocess" element={<Rprocess />} />
                    <Route path="/Favorites" element={<Favorites />} />
                    
                    {/* Protect MyAccount Using ProtectedRoute */}
                    
                    <Route path="/MyAccount" element={
                        <ProtectedRoute>
                            <MyAccount />
                        </ProtectedRoute>
                    } />
                </Routes>
        </Router>
    );
}


export default App;
