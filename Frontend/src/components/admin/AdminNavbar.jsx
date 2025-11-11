import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUser } from "react-icons/fa";

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();


  const notifications = [
    { id: 1, text: "New collection available", read: false },
    { id: 2, text: "Your reservation is confirmed", read: true },
    { id: 3, text: "Special discount today only", read: false }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-gray-800">InstaGuapo</h1>


        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex space-x-6">
            <li><Link to="/admin-dashboard" className="text-black hover:text-blue-600 px-3 py-2">Home</Link></li>
            <li><Link to="/admin-collection" className="text-black hover:text-blue-600 px-3 py-2">Collection</Link></li>
            <li><Link to="/admin-reservation" className="text-black hover:text-blue-600 px-3 py-2">Reservation</Link></li>
            <li><Link to="/admin-calendar" className="text-black hover:text-blue-600 px-3 py-2">Calendar</Link></li>
          </ul>
        </div>


        <div className="flex items-center space-x-4">      
          <div className="relative">
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="text-gray-600 hover:text-yellow-500 p-2 relative"
            >
              <FaBell />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200 font-semibold">
                  Notifications
                </div>
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                      onClick={() => {
                        setNotificationsOpen(false);
                      }}
                    >
                      <p className="text-sm">{notification.text}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date().toLocaleTimeString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="px-4 py-2 text-sm text-gray-500">No notifications</p>
                )}
                <div 
                  className="px-4 py-2 border-t border-gray-200 text-sm text-blue-600 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setNotificationsOpen(false);
                    navigate('/notifications');
                  }}
                >
                  View all notifications
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => navigate('/admin-profile')} 
            className="text-gray-600 hover:text-purple-500 p-2"
          >
            <FaUser />
          </button>


          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden text-gray-700"
          >
            ☰
          </button>
        </div>
      </div>

 
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-2 space-y-2">
          <Link 
            to="/AdDash" 
            onClick={() => setMenuOpen(false)} 
            className="block text-gray-600 hover:text-blue-600"
          >
            Home
          </Link>
          <Link 
            to="/AdminCollection" 
            onClick={() => setMenuOpen(false)} 
            className="block text-gray-600 hover:text-blue-600"
          >
            Collection
          </Link>
          <Link 
            to="/AdminReservation" 
            onClick={() => setMenuOpen(false)} 
            className="block text-gray-600 hover:text-blue-600"
          >
            Reservation
          </Link>
          <Link 
            to="/AdminCalendar" 
            onClick={() => setMenuOpen(false)} 
            className="block text-gray-600 hover:text-blue-600"
          >
            Calendar
          </Link>
          <Link 
            to="/AdminNotifications" 
            onClick={() => setMenuOpen(false)} 
            className=" text-gray-600 hover:text-yellow-500 flex items-center"
          >
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>
          <Link 
            to="/admin-profile" 
            onClick={() => setMenuOpen(false)} 
            className="block text-gray-600 hover:text-purple-600"
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;