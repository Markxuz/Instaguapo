import React from 'react';
import Navbar from '../components/Navbar';

function Aboutus() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="pt-24 container mx-auto px-6 py-8">
                {/* About Us Section with Image */}
                <div className="flex flex-col lg:flex-row items-start gap-8 mb-12">
                    <img 
                        src="/path/to/your/image.jpg" 
                        alt="Storefront" 
                        className="w-full lg:w-1/2 rounded-lg shadow-md"
                    />
                    <div className="lg:w-1/2">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">About Us</h2>
                        <p className="text-gray-700 mb-4">
                            At InstaGuapo, we are dedicated to providing a smooth and hassle-free reservation experience. 
                            With years of industry expertise, we take pride in delivering reliable service and quality 
                            formal wear for every special occasion. Please note that all reservations are strictly 
                            non-refundable. We encourage careful selection before finalizing bookings. Your satisfaction 
                            is our priority, and we look forward to being part of your memorable moments.
                        </p>
                    </div>
                </div>

                {/* Contact and Message Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Us */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
                        <div className="space-y-3 text-gray-700">
                            <p>📞 0926-820-8475 / 09153868022</p>
                            <p>📧 Instaguapo@gmail.com</p>
                            <p>📍 560 jm loyola street, Carmona, Philippines, 4116</p>
                            <p>📸 Instaguapo Fashion Couture</p>
                        </div>
                    </div>

                    {/* Message Us */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Message Us</h2>
                        <form className="space-y-4">
                            <div>
                                <div className="mb-1">Name:</div>
                                <input 
                                    type="text" 
                                    className="w-full px-3 py-2 border border-gray-300 bg-white focus:outline-none"
                                />
                            </div>
                            <div>
                                <div className="mb-1 bg">Email Address</div>
                                <input 
                                    type="email" 
                                    className="w-full px-3 py-2 border border-gray-300 bg-white focus:outline-none"
                                />
                            </div>
                            <div>
                                <div className="mb-1">Message</div>
                                <textarea 
                                    className="w-full px-3 py-2 border border-gray-300 bg-white focus:outline-none"
                                    rows="4"
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="px-4 py-2 bg-black text-white hover:bg-gray-800"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Aboutus;
