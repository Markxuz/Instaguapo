import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";

function Favorites() {
  const navigate = useNavigate();

  const favoriteItems = [
    {
      id: 1,
      name: "Two Tone Full Set",
      price: 5000,
      image: "/images/maroont.png",
    },
    {
      id: 2,
      name: "Luxury Red Ball Gown",
      price: 5000,
      image: "/images/red.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-6">
     <Navbar />

      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-2xl mr-4 font-bold"
        >
          ←
        </button>
        <h1 className="text-2xl font-bold">Favorites</h1>
      </div>


      <div className="flex gap-4 justify-center mb-6">
        <button className="border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white">
          Suits
        </button>
        <button className="border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white">
          Gowns
        </button>
        <button className="border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white">
          Barong
        </button>
      </div>


      <div className="space-y-6">
        {favoriteItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-t border-b py-4"
          >

            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-28 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="mb-2">₱ {item.price}</p>
                <Link to ={`/collection`}>
                <button className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700">
                  Reserve Now
                </button>
                </Link>
              </div>
            </div>

            <FaHeart className="text-blue-600 text-3xl mr-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
