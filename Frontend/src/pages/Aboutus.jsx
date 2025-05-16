import React from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

function Aboutus() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const categories = [
    { title: 'Suits', items: Array(4).fill('Classic Black Tuxedo') },
    { title: 'Gowns', items: Array(4).fill('Elegant Evening Gown') },
    { title: 'Barong', items: Array(4).fill('Traditional Barong Tagalog') },
  ];

   return (
     <div className="min-h-screen bg-gray-100">
       {/* Navbar */}
       <nav className="bg-white shadow-md">
         <div className="container mx-auto px-6 py-4 flex items-center justify-between">
           {/* Logo on the left */}
           <h1 className="text-4xl font-bold text-gray-800">InstaGuapo</h1>
           
           {/* Centered Navigation Links */}
           <div className="flex-1 flex justify-center">
             <ul className="flex space-x-6">
               <li>
                 <Link to="/mainpage" className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
                   Home
                 </Link>
               </li>
               <li>
                 <Link to="/collection" className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
                   Collection
                 </Link>
               </li>
               <li>
                 <Link to="/reservation" className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
                   Reservation
                 </Link>
               </li>
               <li>
                 <Link to="/aboutus" className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
                   About Us
                 </Link>
               </li>
             </ul>
           </div>
           
           {/* Right-side Icons */}
           <div className="flex items-center space-x-4">
             {/* Favorites Button */}
             <button 
               className="p-2 text-gray-600 hover:text-red-500 hover:bg-gray-100 rounded-full transition"
               onClick={() => navigate('/favorites')}
             >
               <FaHeart className="text-xl" />
             </button>
             
             {/* Settings Dropdown */}
             <div className="relative group">
               <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition">
                 <FaCog className="text-xl" />
               </button>
               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-10">
                 <button 
                   onClick={handleLogout}
                   className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                 >
                   <FaSignOutAlt className="mr-2" />
                   Logout
                 </button>
               </div>
             </div>
             
             {/* Profile Button */}
             <button 
               className="p-2 text-gray-600 hover:text-purple-600 hover:bg-gray-100 rounded-full transition"
               onClick={() => navigate('/profile')}
             >
               <FaUser className="text-xl" />
             </button>
           </div>
         </div>
       </nav>
    
          {/* About Us Section */}
          <section className="container mx-auto px-6 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
              {/* Image */}
              <div className="w-full md:w-1/2">
                <img
                  src="https://via.placeholder.com/600x400"
                  alt="InstaGuapo Store"
                  className="rounded-lg shadow-md"
                />
              </div>
              {/* About Us Text */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <p className="text-gray-700 text-lg">
                  We are dedicated to providing the best reservation experience for
                  our customers. With years of expertise in the industry, we ensure
                  smooth and hassle-free bookings.
                </p>
              </div>
            </div>
          </section>
    
          {/* Contact Us Section */}
          <section className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Us */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h3>
                <p className="text-gray-700">
                  📞 0926-820-8475 / 0915-386-8022
                </p>
                <p className="text-gray-700">📧 Instaguapo@gmail.com</p>
                <p className="text-gray-700">
                  📍 560 JM Loyola Street, Carmona, Philippines, 4116
                </p>
              </div>
              {/* Follow Us */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex justify-center md:justify-start space-x-6">
                  <a
                    href="https://www.facebook.com/share/1DPxfvuJHC/?mibextid=wwXIfr"
                    className="text-gray-600 hover:text-gray-800 text-2xl"
                  >
                    <i className="fab fa-facebook"></i> {/* Replace with actual icons */}
                    Facebook
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 text-2xl"
                  >
                    <i className="fab fa-instagram"></i> {/* Replace with actual icons */}
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 text-2xl"
                  >
                    <i className="fab fa-twitter"></i> {/* Replace with actual icons */}
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      );

}

export default Aboutus;