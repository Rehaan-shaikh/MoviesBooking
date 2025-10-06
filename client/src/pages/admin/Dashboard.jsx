import React from 'react';
import { Film, Ticket, Users, DollarSign } from 'lucide-react';
import { dummyDashboardData, dummyBookingData } from '../../assets/assets.js';

const StatCard = ({ icon, label, value, color }) => (
  <div className={`bg-[#1A1A1A] p-6 rounded-lg flex items-center gap-4 border border-gray-700`}>
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  </div>
);


const Dashboard = () => {
  const { totalBookings, totalRevenue, totalUser, activeShows } = dummyDashboardData;

  return (
    <div className='text-white'>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<Ticket />} label="Total Bookings" value={totalBookings} color="bg-blue-500/20 text-blue-400" />
        <StatCard icon={<DollarSign />} label="Total Revenue" value={`$${totalRevenue}`} color="bg-green-500/20 text-green-400" />
        <StatCard icon={<Users />} label="Total Users" value={totalUser} color="bg-yellow-500/20 text-yellow-400" />
        <StatCard icon={<Film />} label="Active Shows" value={activeShows.length} color="bg-purple-500/20 text-purple-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#1A1A1A] p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Active Shows</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
                {activeShows.map(show => (
                    <div key={show._id} className="flex items-center gap-4 p-2 bg-[#2D2D2D] rounded-md">
                        <img src={show.movie.poster_path} alt={show.movie.title} className="w-16 h-24 object-cover rounded"/>
                        <div>
                            <p className="font-bold">{show.movie.title}</p>
                            <p className="text-sm text-gray-400">{new Date(show.showDateTime).toLocaleString()}</p>
                            <p className="text-sm text-primary">${show.showPrice}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="bg-[#1A1A1A] p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
                {dummyBookingData.slice(0,5).map(booking => (
                     <div key={booking._id} className="flex justify-between items-center p-3 bg-[#2D2D2D] rounded-md">
                        <div>
                            <p className="font-semibold">{booking.show.movie.title}</p>
                            <p className="text-xs text-gray-400">by {booking.user.name}</p>
                        </div>
                        <div className='text-right'>
                            <p className="font-semibold text-primary">${booking.amount}</p>
                            <p className={`text-xs ${booking.isPaid ? 'text-green-400' : 'text-yellow-400'}`}>
                                {booking.isPaid ? 'Paid' : 'Pending'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard;

