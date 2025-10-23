import Booking from "../models/Bookings.js";
import Show from "../models/Shows.js";

export const listShows = async (req, res) => {
  try {
    const shows = await Show.find().populate("movie"); // populate movie details
    res.json(shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const listBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate([
      { path: "user", select: "name" },
      { path: "show", populate: { path: "movie" } },
      { path: "foods", populate: { path: "food", select: "name price image" } },
    ]);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
