import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Rprocess() {
    const [pickupDate, setPickupDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [referenceNumber, setReferenceNumber] = useState('');
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleContinueClick = () => {
        setShowTermsModal(true);
    };

    const handleAcceptTerms = () => {
        setAcceptedTerms(true);
        setShowTermsModal(false);
        // Show success message
        setShowSuccess(true);
        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
        // Here you would typically submit to your backend
        console.log('Reservation submitted with:', {
            pickupDate,
            returnDate,
            referenceNumber
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            {/* Main Content */}
            <div className="pt-24 container mx-auto px-6 py-8 max-w-4xl">
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Make A Reservation</h1>

                {/* Reservation Steps */}
                <div className="space-y-6">
                    {/* Step 1 */}
                    <div className="border border-gray-300 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Pick-Up Date</h2>
                        <p className="text-gray-600 mb-4">Select your preferred date and time for the reservation</p>
                        <div className="flex items-center space-x-4">
                            <div className="w-full max-w-xs">
                                <DatePicker
                                    selected={pickupDate}
                                    onChange={(date) => setPickupDate(date)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    dateFormat="MMMM d, yyyy"
                                    minDate={new Date()}
                                    placeholderText="Select date"
                                    showPopperArrow={false}
                                    calendarClassName="border border-gray-300 shadow-lg rounded-md"
                                    dayClassName={() => "hover:bg-blue-100"}
                                    wrapperClassName="w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="border border-gray-300 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Return Date</h2>
                        <p className="text-gray-600">Choose the exact return date</p>
                        <div className="flex items-center space-x-4">
                            <div className="w-full max-w-xs">
                                <DatePicker
                                    selected={returnDate}
                                    onChange={(date) => setReturnDate(date)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    dateFormat="MMMM d, yyyy"
                                    minDate={pickupDate || new Date()}
                                    placeholderText="Select date"
                                    showPopperArrow={false}
                                    calendarClassName="border border-gray-300 shadow-lg rounded-md"
                                    dayClassName={() => "hover:bg-blue-100"}
                                    wrapperClassName="w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="border border-gray-300 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment</h2>
                        <p className="text-gray-600">Complete payment through GCash</p>
                        <div className="flex justify-center">
                            <img 
                                src="/images/gcash-qr.png"
                                alt="GCash QR Code" 
                                className="w-48 h-48 object-contain border rounded-lg shadow"
                            />
                        </div>
                    </div>

                    {/* Step 4 with Reference Number Input */}
                    <div className="border border-gray-300 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Enter Reference Number</h2>
                        <p className="text-gray-600 mb-2">Reference number of GCash for your booking confirmation</p>
                        <input
                            type="text"
                            value={referenceNumber}
                            onChange={(e) => setReferenceNumber(e.target.value)}
                            placeholder="Enter GCash Reference Number"
                            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    <button className="px-6 py-2 border border-gray-400 rounded-lg font-medium hover:bg-gray-100">
                        Back
                    </button>
                    <button 
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                        onClick={handleContinueClick}
                        disabled={!pickupDate || !returnDate || !referenceNumber}
                    >
                        Continue
                    </button>
                </div>
            </div>

            {/* Terms & Conditions Modal */}
            {showTermsModal && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
                    style={{
                        backgroundImage: "url('images/background_resized.jpg')",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center bottom"}}>
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">InstaGuapo Terms & Conditions</h2>
                        
                        <div className="text-gray-700 space-y-4 mb-6">
                            <p>After making a reservation, you must arrive at InstaGuapo two days. I work with your new Philippines, club, within a Monet. If you do not arrive until three specified time, your reservation will not be proceeded.</p>
                            
                            <p>Balance should be paid on the paid date and must assume that all of them prior to instaGuapo will not release the formal user without child.</p>
                            
                            <p>Find up time will be at 8 pm amounts on the paid up date.</p>
                            
                            <p>Formal Note has to be returned on the declared date. Forward in terms of any call input from each of the said date there would be penalty if 300 person per day.</p>
                        </div>
                        
                        <div className="flex items-center mb-6">
                            <input
                                type="checkbox"
                                id="acceptTerms"
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                                className="mr-2 h-5 w-5"
                            />
                            <label htmlFor="acceptTerms" className="text-gray-700">
                                I agree to the Terms and Conditions
                            </label>
                        </div>
                        
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 border border-gray-400 rounded-lg font-medium hover:bg-gray-100"
                                onClick={() => setShowTermsModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                                onClick={handleAcceptTerms}
                                disabled={!acceptedTerms}
                            >
                                Accept & Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Notification */}
            {showSuccess && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center z-50">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Reservation successfully submitted!</span>
                </div>
            )}
        </div>
    );
}

export default Rprocess;