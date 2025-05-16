import React from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

function Reservation() {
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
            {/* Reservation Form */}
                <section className="container mx-auto px-16 py-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800">Make a Reservation</h2>
                    </div>
                    <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">1</h2>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Name</label>
                            <input type="text" id="name" className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input type="email" id="email" className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="date" className="block text-gray-700">Reservation Date</label>
                            <input type="date" id="date" className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
                        </div>
                        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Submit Reservation</button>
                        
                    </form>
                </section>
        </div>
      );

}

export default Reservation;