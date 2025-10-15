import Movie from "../models/Movies.js";
import Show from "../models/Shows.js";
import User from "../models/User.js";
import { getCurrentUser } from "./AuthController.js";

export const getMovieShowDetails = async (req, res) => {
  try {
    const { id } = req.params; // id = tmdb_id

    // 1️⃣ Find movie by tmdb_id
    const movie = await Movie.findOne({ tmdb_id: id });
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    // 2️⃣ Find all upcoming shows for this movie
    const shows = await Show.find({
      movie: movie._id,
      showDateTime: { $gte: new Date() }, // only future shows
    }).sort({ showDateTime: 1 });

    // 3️⃣ Group shows by date (for DateSelect)
    const dateTime = {};
    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split("T")[0]; // e.g., '2025-10-09'
      const time = show.showDateTime.toISOString().split("T")[1].slice(0, 5); // e.g., '18:30'
      if (!dateTime[date]) dateTime[date] = [];
      dateTime[date].push(time);
    });

    // 4️⃣ Send combined response
    res.json({
      success: true,
      movie,
      dateTime, // { "2025-10-09": ["18:30", "20:00"], "2025-10-10": ["17:15"] }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


//Favourate 
//Refer user model for dummy visualization of data
export const toggleFavourite = async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    if (!user) return res.status(401).json({ message: "User not authenticated" });

    const { movieId } = req.params;
    const movie = await Movie.findOne({ tmdb_id: movieId });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // 🧩 Step 1: currentUser is a Mongoose Document instance
    // When we use `User.findById()`, it returns a Mongoose document — not a plain JS object.
    // This document is linked to the `User` model and the `users` collection in MongoDB.
    // It knows which collection it belongs to, its own _id, and tracks field changes automatically.
    const currentUser = await User.findById(user._id);

    const movieIdStr = movie._id.toString();

    const alreadyFav = currentUser.favourites.some(
      (id) => id && id.toString() === movieIdStr
    );

    if (alreadyFav) {
      // ✅ Step 2: Modify the document
      // Removing movie from favourites — Mongoose marks this field as modified internally.
      currentUser.favourites = currentUser.favourites.filter(
        (id) => id && id.toString() !== movieIdStr
      );

      // 🧩 Step 3: Save the document
      // When calling `await currentUser.save()`, Mongoose automatically performs an UPDATE
      // on the correct collection (`users`) using the document’s _id.
      // Internally it runs something like:
      // db.users.updateOne({ _id: currentUser._id }, { $set: { favourites: [...] } });
      // You don’t need to tell it which model to update — it already knows.
      await currentUser.save();
      return res.status(200).json({ success: true, message: "Removed from favourites" });
    } else {
      // ✅ Add movie to favourites — again, Mongoose tracks the change
      currentUser.favourites.push(movie._id);

      // Saving automatically updates only the modified fields for this document
      await currentUser.save();
      return res.status(200).json({ success: true, message: "Added to favourites" });
    }
  } catch (error) {
    console.error("Error toggling favourite:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all favourites
export const getFavourites = async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    if (!user) return res.status(401).json({ message: "User not authenticated" });

    const populatedUser = await User.findById(user._id).populate("favourites");
    //populate("favourites") tells Mongoose to replace each ObjectId in the favourites array with the full Movie document it refers to
    res.status(200).json({ success: true, favourites: populatedUser.favourites });
  } catch (error) {
    console.error("Error fetching favourites:", error);
    res.status(500).json({ message: "Server error" });
  }
};