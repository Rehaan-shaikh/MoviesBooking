import React from 'react';
import { dummyDashboardData } from '../../assets/assets.js';
import { Trash2, Edit } from 'lucide-react';

const ListShows = () => {
  const { activeShows } = dummyDashboardData;

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Show Listings</h1>
        <button className="bg-primary hover:bg-primary-dull text-white font-bold py-2 px-4 rounded-lg">
          Add New Show
        </button>
      </div>
      <div className="bg-[#1A1A1A] border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-[#2D2D2D]">
              <tr>
                <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">Movie</th>
                <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">Date & Time</th>
                <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">Price</th>
                <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">Occupied Seats</th>
                <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {activeShows.map((show) => (
                <tr key={show._id}>
                  <td className="whitespace-nowrap py-4 px-4">
                    <div className="flex items-center">
                      <div className="h-16 w-12 flex-shrink-0">
                        <img className="h-16 w-12 rounded object-cover" src={show.poster_path} alt={show.title} />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">{show.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">{new Date(show.showDateTime).toLocaleString()}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-primary">${show.showPrice}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">{Object.keys(show.occupiedSeats).length}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm">
                    <div className="flex items-center gap-4">
                      <button className="text-yellow-400 hover:text-yellow-300">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-400">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListShows;



// const ListShows = () => {
//   const currency = import.meta.env.VITE_CURRENCY
// const [shows, setShows] = useState([]);
// const [loading, setLoading] = useState(true);
// const getAllShows = async () =>{
// try {
// SetShows ([{
// movie: dummyShowsData[0],
// showDateTime: "2025-06-30T02:30:00.000Z",
// showPrice: 59,
// occupiedSeats: {
// A1: "user_1",
// B1: "user_2".
// C1: "user_3"
// }
// }]);
// setLoading (false);
// } catch (error) {
// console.error(error);
// }
// }

