import Navbar from '../components/Navbar';

function Aboutus() {
    return (
     <div className="min-h-screen bg-gray-100">
        <Navbar />
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