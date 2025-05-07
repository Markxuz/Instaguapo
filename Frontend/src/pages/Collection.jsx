import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaHeart, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

function Collection() {
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

      {/* Collection Sections */}
      <div className="container mx-auto px-6 py-12">
        {categories.map((category, index) => (
          <section key={index} className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{category.title}</h2>
              <a href="#" className="text-blue-600 hover:underline">View All</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {category.items.map((item, idx) => (
                <div key={idx} className="bg-white shadow-md rounded-lg p-4">
                  <div className="h-40 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Product Image</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-800">{item}</h3>
                  <p className="text-gray-600">₱1200/day</p>
                  <Link to= "/Reservation">
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Reserve Now
                  </button>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Collection;