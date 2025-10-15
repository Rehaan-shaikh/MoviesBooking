import Booking from "../models/Bookings.js";
import Show from "../models/Shows.js";
import { getCurrentUser } from "./AuthController.js";

export const checkSeatAvailability = async (showId, selectedSeats) => {
  const show = await Show.findById(showId);
  if (!show) return false;

  const occupiedSeats = show.occupiedSeats || {};

  // Check if any selected seat is already occupied
  const isOccupied = selectedSeats.some((seat) => occupiedSeats[seat]);

  // If any seat is occupied → not available
  return !isOccupied;
};

// Create Booking
export const createBooking = async (req, res) => {
  try {
    // ✅ Get current user
    const user = await getCurrentUser(req);
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });

    const { showId, selectedSeats } = req.body;

    // ✅ Check if seats are available
    const isAvailable = await checkSeatAvailability(showId, selectedSeats);
    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Selected seats are not available.",
      });
    }

    // ✅ Get the show details
    const showData = await Show.findById(showId).populate("movie");

    // ✅ Create a new booking
    const booking = await Booking.create({
      user: user._id,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
    });

    // ✅ Mark those seats as occupied
    selectedSeats.forEach((seat) => {
      showData.occupiedSeats[seat] = user._id;
      // occupiedSeats object has been updated in memory
    });
  // Ex :
  // occupiedSeats: {
  //   A1: "U555", //prev ones
  //   A2: "U666", //prev ones 
  //   A3: "U123",
  //   A4: "U123", // you 
  //   A5: "U123"
  // }

    // Mongoose doesn’t automatically detect changes inside nested objects,
    // so we explicitly mark it as modified to ensure it gets saved to the database   
    showData.markModified("occupiedSeats");
    await showData.save();

    res.json({
      success: true,
      message: "Booked successfully",
      booking,
    });
  } catch (error) {
    console.log("Booking Error:", error);
    res.json({
      success: false,
      message: error.message || "Booking failed",
    });
  }
};



export const getOccupiedSeats = async (req, res)=>{
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);
    console.log(showData.occupiedSeats);
    
    const occupiedSeats = Object.keys(showData.occupiedSeats);
    console.log(occupiedSeats);

    res.json({success: true, occupiedSeats});
  } catch (error) {
    console.log(error.message);
    res.json({success: false, message: error.message});
  }
}


export const getUserBookings = async (req, res)=>{
    try {
    // ✅ Get current user
    const user = await getCurrentUser(req);
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });

        const bookings = await Booking.find({user : user._id}).populate({
            path: "show",   //use path when there is nested populates
            populate: { path: "movie" }
        }).sort({createdAt: -1})

        res.json({ success: true, bookings });
    } catch (error) {
        console.error(error.message)
        res.json({ success: false, message: error.message })
    }
}

// API Controller Function to Add Favorite Movie in Clerk User Metadata