import axios from "axios";

export const getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get("https://api.themoviedb.org/3/movie/now_playing", {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    const movies = data.results;
    res.json({ success: true, movies });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
