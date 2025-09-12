import AdNav from "../../components/admin/AdNav";
import AdminLoginForm from "../../components/admin/AdminLoginForm";

function AdminLogin() {
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
        <AdminLoginForm />
      </div>
    </div>
  );
}

export default AdminLogin;
