import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Reservation() {
   return (
     <div className="min-h-screen bg-gray-100">
      <Navbar />
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