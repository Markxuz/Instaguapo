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
import Favorites from "./components/user/Favorites";
import Rprocess from "./components/Rprocess";

import AdminSignup from "./pages/adminblock/AdminSignup";
import AdminLogin from "./pages/adminblock/AdminLogin";
import AdVerificationForm from "./components/admin/Adverificationform";
import AdDash from "./pages/adminblock/AdDash";
import AdminCollection from "./pages/adminblock/AdminCollection";
import AdminReservation from "./pages/adminblock/AdminReservation";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/passcode" element={<Forgotpass />} />
                <Route path="/verifyemail" element={<VerifyEmail />} />
                <Route path="/reset-password" element={<ResetPassword />} />


                <Route path="/admin-signup" element={<AdminSignup />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-verification" element={<AdVerificationForm />} />
                <Route path="/admin-dashboard" element={<AdDash />} />
                <Route path="/admin-collection" element={<AdminCollection />} />
                <Route path="/admin-reservation" element={<AdminReservation />} />


                <Route path="/mainpage" element={<Mainpage />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/aboutus" element={<Aboutus />} />
                <Route path="/rprocess" element={<Rprocess />} />
                <Route path="/favorites" element={<Favorites />} />

                <Route path="/myaccount" element={<MyAccount />} />
            </Routes>
        </Router>
    );
}

export default App;
