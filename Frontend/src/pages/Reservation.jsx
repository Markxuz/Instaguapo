import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Reservation() {
  const navigate = useNavigate();

  const handleNewReservation = () => {
    navigate('/collection');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="pt-24 container mx-auto px-6 py-6">
        {/* Title and Button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Your Reservation</h1>
          <button 
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={handleNewReservation}
          >
            New Reservation
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center text-sm text-center text-gray-700 mb-6">
          {[
            "Select Items",
            "Book Date",
            "Fit & Get",
            "Confirmed",
            "Return",
            "Complete",
          ].map((step, i) => (
            <div key={i} className="flex-1 relative">
              <div className="flex items-center justify-center w-6 h-6 mx-auto bg-blue-600 text-white rounded-full text-xs">
                {i + 1}
              </div>
              <div className="mt-2">{step}</div>
              {i < 5 && (
                <div className="absolute top-3 left-1/2 w-full h-0.5 bg-gray-300 z-[-1]"></div>
              )}
            </div>
          ))}
        </div>

        {/* Reservation Card */}
        <div className="border border-gray-400 rounded-md p-4 bg-white shadow">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Image */}
            <div className="w-full md:w-1/3 text-center">
              <img
                src="images/maroont.png"
                alt="Formal Wear"
                className="w-40 h-auto mx-auto border rounded-lg"
              />
              <p className="font-semibold mt-2">Two Tone Full Set</p>
              <p>₱5000</p>
            </div>

            {/* Details */}
            <div className="w-full md:w-2/3">
              <p className="font-bold text-lg mb-2 flex items-center">
                <span className="mr-2">👤</span> Name
              </p>
              <p><span className="font-semibold">Date of Reservation:</span> May 03, 2024</p>
              <p><span className="font-semibold">Time:</span> 11:30 am</p>
              <p><span className="font-semibold">Date Of Pick Up:</span> May 03, 2024</p>
              <p><span className="font-semibold">Date Of Return:</span> May 05, 2024</p>
              <p><span className="font-semibold">Amount:</span> ₱2500</p>
              <p><span className="font-semibold">Reference number of Gcash:</span> 1234 567 891012</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;