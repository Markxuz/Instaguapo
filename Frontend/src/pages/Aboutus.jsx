import React from 'react';
import {Link} from 'react-router-dom';

function Aboutus() {
    return (
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
              <h1 className="text-4xl font-bold text-gray-800">InstaGuapo</h1>
              <div className="flex items-center space-x-4">
                //Navbar Links
                <ul className="flex space-x-6">
                  <li><Link to="/Mainpage" className="text-gray-600 hover:text-gray-800">Home</Link></li>
                  <li><Link to="/collection" className="text-gray-600 hover:text-gray-800">Collection</Link></li>
                  <li><Link to="/reservation" className="text-gray-600 hover:text-gray-800">Reservation</Link></li>
                  <li><Link to="/aboutus" className="text-gray-600 hover:text-gray-800">About Us</Link></li>
                </ul>
                //Search Bar not working yet
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    🔍
                  </button>
                </div>
              </div>
            </div>
          </nav>
    
          //About Us
          <section className="container mx-auto px-6 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
              //Image
              <div className="w-full md:w-1/2">
                <img
                  src="https://via.placeholder.com/600x400"
                  alt="InstaGuapo Store"
                  className="rounded-lg shadow-md"
                />
              </div>
              //Description
              <div className="w-full md:w-1/2 text-center md:text-left">
                <p className="text-gray-700 text-lg">
                  We are dedicated to providing the best reservation experience for
                  our customers. With years of expertise in the industry, we ensure
                  smooth and hassle-free bookings.
                </p>
              </div>
            </div>
          </section>
    
          //Contact Us and Follow Us
          <section className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              //Contact Us
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
              //Follow Us
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