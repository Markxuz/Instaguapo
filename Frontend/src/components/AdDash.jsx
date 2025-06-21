import React from "react";
import AdminNavbar from "./AdminNavbar";

const AdDash = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <AdminNavbar />
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">InstaGuapo</h1>
      
      {/* Filters Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="flex space-x-4 mb-6">
          <button className="px-4 py-2 bg-gray-200 rounded-md">Date</button>
          <button className="px-4 py-2 bg-gray-200 rounded-md">Time</button>
          <button className="px-4 py-2 bg-gray-200 rounded-md">Status</button>
          <button className="px-4 py-2 bg-gray-200 rounded-md">Reference number of Goals</button>
        </div>
        <hr className="border-t-2 border-gray-300 my-4" />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Total Reservations</h3>
          <p className="text-3xl font-bold">100</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Today's Reservation</h3>
          <p className="text-3xl font-bold">21</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Reading Request</h3>
          <p className="text-3xl font-bold">6</p>
        </div>
      </div>

      {/* Recent Reservations Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Reservation</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Customer</th>
                <th className="py-2 px-4 border">Date of Reservation</th>
                <th className="py-2 px-4 border">Time</th>
                <th className="py-2 px-4 border">Date of Pick Up</th>
                <th className="py-2 px-4 border">Date of Return</th>
                <th className="py-2 px-4 border">Reference Number of Goals</th>
                <th className="py-2 px-4 border">Payment Status</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border">......</td>
                <td className="py-2 px-4 border">April 16, 2020</td>
                <td className="py-2 px-4 border">10:00 am</td>
                <td className="py-2 px-4 border">April 16, 2020</td>
                <td className="py-2 px-4 border">April 16, 2020</td>
                <td className="py-2 px-4 border">1234.907.0002</td>
                <td className="py-2 px-4 border">9:40 h Jul</td>
                <td className="py-2 px-4 border">Completed</td>
                <td className="py-2 px-4 border font-bold">1</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">......</td>
                <td className="py-2 px-4 border">April 16, 2020</td>
                <td className="py-2 px-4 border">10:00 am</td>
                <td className="py-2 px-4 border">April 16, 2020</td>
                <td className="py-2 px-4 border">April 16, 2020</td>
                <td className="py-2 px-4 border">1234.907.0002</td>
                <td className="py-2 px-4 border">9:40 h Jul</td>
                <td className="py-2 px-4 border">Completed</td>
                <td className="py-2 px-4 border font-bold">1</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">......</td>
                <td className="py-2 px-4 border">April 17, 2020</td>
                <td className="py-2 px-4 border">10:00 am</td>
                <td className="py-2 px-4 border">April 16, 2020</td>
                <td className="py-2 px-4 border">April 16, 2020</td>
                <td className="py-2 px-4 border">1234.907.0002</td>
                <td className="py-2 px-4 border">8:00 h Oct</td>
                <td className="py-2 px-4 border">Completed</td>
                <td className="py-2 px-4 border font-bold">1</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">......</td>
                <td className="py-2 px-4 border">April 17, 2020</td>
                <td className="py-2 px-4 border">10:00 am</td>
                <td className="py-2 px-4 border">April 17, 2020</td>
                <td className="py-2 px-4 border">April 16, 2020</td>
                <td className="py-2 px-4 border">1234.907.0002</td>
                <td className="py-2 px-4 border">9:40 h Jul</td>
                <td className="py-2 px-4 border">Completed</td>
                <td className="py-2 px-4 border font-bold">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Rk Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Key Rk 2020</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <span>10:00 am</span>
          <span>|</span>
          <span>March 16, 2020</span>
          <span>|</span>
          <span>May 16, 2020</span>
          <span>|</span>
          <span>1234.907.0002</span>
          <span>|</span>
          <span>9:40 h Jul</span>
          <span>|</span>
          <span>Completed</span>
          <span>|</span>
          <span className="font-bold">1</span>
        </div>
      </div>
    </div>
  );
};

export default AdDash;