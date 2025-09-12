import AdNav from "../../components/admin/AdNav";
import AdminSignupForm from "../../components/admin/AdminSignupForm";

function AdminSignup() {
  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col"
      style={{
        backgroundImage: "url('images/background_resized.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      <AdNav />
      <div className="flex-grow flex items-center justify-center">
        <AdminSignupForm />
      </div>
    </div>
  );
}

export default AdminSignup;
