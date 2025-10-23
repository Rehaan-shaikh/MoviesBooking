import Show from "../models/Shows.js";

export const listShows = async (req, res) => {
  try {
    const shows = await Show.find().populate("movie"); // populate movie details
    res.json(shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
