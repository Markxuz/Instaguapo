import React from 'react';
import {Link} from 'react-router-dom';

function Passcode() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Navbar */}
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">InstaGuapo</h1>
            <ul className="flex space-x-6">
                <li><Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link></li>
                <li><Link to="/signup" className="text-gray-600 hover:text-gray-800">Sign Up</Link></li>
            </ul>
            </div>
        </nav>
    
        {/* Forgot Password Form */}
        <div className="flex-grow flex items-center justify-center">
            <form className="bg-white p-8 rounded shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
            <p className="mb-4 text-gray-600">Enter code for verification.</p>
            <input type="code" placeholder="6-Digit Code" className="w-full p-3 border border-gray-300 rounded mb-4" required />
            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200">Send Code</button>
            <p className="mt-4 text-center text-gray-600">Remembered your password? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
            </form>
        </div>
    
        {/* Footer */}
        <footer className="bg-white shadow-md mt-auto">
            <div className="container mx-auto px-6 py-4 text-center">
            &copy; 2023 InstaGuapo. All rights reserved.
            </div>
        </footer>
        </div>
    );
}
 
export default Passcode; 