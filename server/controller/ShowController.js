import axios from "axios";
import Movie from "../models/Movies.js";
import Show from "../models/Shows.js";

export const getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
    const movies = data.results;
    res.json({ success: true, movies });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;
    console.log(movieId);
    
    let movie = await Movie.findOne({ tmdb_id: movieId });

    if (!movie) {
      // Fetch movie details and credits from TMDB API
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },}),

        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {  //for casts
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
       }),
      ]);

      const movieApiData = movieDetailsResponse.data;
      const movieCreditsData = movieCreditsResponse.data;

      const movieDetails = {
        tmdb_id: movieId,
        title: movieApiData.title,
        overview: movieApiData.overview,
        poster_path: movieApiData.poster_path,
        backdrop_path: movieApiData.backdrop_path,
        genres: movieApiData.genres.map((g) => g.name), //generes is an array of objects, we need only name from those obj
        casts: movieCreditsData.cast,
        release_date: movieApiData.release_date,
        original_language: movieApiData.original_language,
        tagline: movieApiData.tagline || "",
        vote_average: movieApiData.vote_average,
        runtime: movieApiData.runtime,
      };

      // Add movie to the database
      movie = await Movie.create(movieDetails);
    }

    //ShowInput is an array of objects
    // ex: const showsInput = [
    //   {
    //     date: "2025-10-09",
    //     time: ["18:30", "20:00"]
    //   },
    //   {
    //     date: "2025-10-10",
    //     time: ["17:15"]
    //   }
    // ];
    //REFER THIS TO UNDERSTAND THE BELOW LOGIC
    // https://chatgpt.com/share/68e762df-a9cc-8007-ad1d-5dd3a92a80cd
    const showsToCreate = [];
    showsInput.forEach((show) => {
      const showDate = show.date;
      show.time.forEach((time) => {
        const dateTimeString = `${showDate}T${time}`;
        showsToCreate.push({
          movie: movie._id, //acts as a foreign key (or more precisely, a reference) to the Movie document in MongoDB.
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {},
        });
      });
    });
    

    if (showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
    }
    res.json({ success: true, message: "Shows added successfully" });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message || "Shows not added successfully",
    });
  }
};

// Get all active movies with their show time for admin dashboard
export const getActiveShowsForAdmin = async (req, res) => {
  try {
    // 1️⃣ Fetch all upcoming shows and populate movie details
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });

      // console.log(shows);
      
    // 2️⃣ Group all shows by movie where each movie has an array of its showtimes and prices
    const movieShowsMap = {};

    shows.forEach((show) => {
      const movieId = show.movie._id.toString();
      if (!movieShowsMap[movieId]) {
        movieShowsMap[movieId] = {
          movie: show.movie,
          showTimes: [],
        };
      }
      movieShowsMap[movieId].showTimes.push({  //if movie already exists, just push the showtime and price to showTimes array
        _id: show._id,
        showDateTime: show.showDateTime,
        showPrice: show.showPrice,
      });
    });

    // 3️⃣ Convert grouped data to array
    const formattedShows = Object.values(movieShowsMap);

    res.json({ success: true, shows: formattedShows });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


// Get shows times by date
export const getShowsTimingByDate = async (req, res) => {
  try {
    const { movieId, date } = req.params;
    // console.log(movieId, date, "aaaaaaaa");

    //find the movie by tmdb_id
    const movie = await Movie.findOne({ tmdb_id: movieId });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // ✅ Date range search for that entire day
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);


    const shows = await Show.find({
      movie: movie._id,
      showDateTime: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ showDateTime: 1 });

    console.log(shows);

    const timings = shows.map((show) => ({
      time: show.showDateTime,
      showId: show._id,
      price: show.showPrice,
    }));
    console.log(timings);
    

    // ✅ No formattedMovie defined — return full movie
    res.status(200).json({
      dateTime : timings
    });
  } catch (err) {
    console.error("Error fetching movie shows by date:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//search movie function
export const searchMoviesByTitle = async (req, res) => {
  try {
    const { query } = req.body;
    console.log("query", query);

    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );

    const movies = response.data.results;
    console.log(movies);

    res.json({ success: true, movies });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.status_message || error.message,
    });
  }
};

//getting active movies which has (shows) for users
export const getActiveShowsForUsers = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 }); //dont return the past shows
    // shows is an array of show documents you fetched from MongoDB. Each show document contains a reference to a movie document through the movie field.
    
    const moviesArray = shows.map((show) => show.movie);
    // console.log(moviesArray);  //This takes only the movie object from each show:

    //A Set in JavaScript is a collection of unique values. By converting the moviesArray to a Set, you automatically filter out any duplicate movie entries, ensuring that each movie appears only once in the final output.
    const uniqueShows = new Set(moviesArray);
    res.json({ success: true, shows: Array.from(uniqueShows) });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
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
