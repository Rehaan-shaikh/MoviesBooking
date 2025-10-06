import React from 'react';
import { dummyBookingData } from '../../assets/assets.js';

const ListBookings = () => {
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-8">All Bookings</h1>
      <div className="bg-[#1A1A1A] border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-[#2D2D2D]">
              <tr>
                <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">Movie</th>
                <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">User</th>
                <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">Date & Time</th>
                <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">Amount</th>
                <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">Seats</th>
                <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {dummyBookingData.map((booking) => (
                <tr key={booking._id}>
                  <td className="whitespace-nowrap py-4 px-4">
                    <div className="flex items-center">
                      <div className="h-16 w-12 flex-shrink-0">
                        <img className="h-16 w-12 rounded object-cover" src={booking.show.movie.poster_path} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">{booking.show.movie.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">{booking.user.name}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">{new Date(booking.show.showDateTime).toLocaleString()}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-primary">${booking.amount}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">{booking.bookedSeats.join(', ')}</td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${booking.isPaid ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                      {booking.isPaid ? 'Paid' : 'Pending'}
                    </span>
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

export default ListBookings;

