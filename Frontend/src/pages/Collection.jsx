import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Collection() {
  const categories = [
    { title: 'Suits', items: Array(4).fill('Classic Black Tuxedo') },
    { title: 'Gowns', items: Array(4).fill('Elegant Evening Gown') },
    { title: 'Barong', items: Array(4).fill('Traditional Barong Tagalog') },
  ];

   return (
     <div className="min-h-screen bg-gray-100">
      <Navbar />
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