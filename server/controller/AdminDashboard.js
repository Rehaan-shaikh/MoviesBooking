import Booking from "../models/Bookings.js";
import Show from "../models/Shows.js";
import User from "../models/User.js";

export const dashboardData = async (req, res) => {
  try {
    const countUser = await User.countDocuments();

    const activeShows = await Show.find({ showDateTime: { $gte: new Date() } });

    const bookings = await Booking.find({ isPaid: true });

    const revenue = bookings.reduce((acc, booking) => acc + booking.amount, 0);

    const dashboardData = {
      totalUsers: countUser,
      totalActiveShows: activeShows.length,
      totalBookings: bookings.length,
      totalRevenue: revenue,
    };

    res.status(200).json({ success: true, data: dashboardData });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
