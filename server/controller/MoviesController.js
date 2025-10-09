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

    let movie = await Movie.findOne({ tmdb_id: movieId });

    if (!movie) {
      // Fetch movie details and credits from TMDB API
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` },
        }),

        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` },
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
        genres: movieApiData.genres.map(g => g.name),  //generes is an array of objects, we need only name from those obj
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
                movie: movie._id,  //acts as a foreign key (or more precisely, a reference) to the Movie document in MongoDB.
                showDateTime: new Date(dateTimeString),
                showPrice,
                occupiedSeats: {}
            })
        });
    });

    if (showsToCreate.length > 0) {
        await Show.insertMany(showsToCreate);
    }
    res.json({ success: true, message: "Shows added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message || "Shows not added successfully" });
  }
};


export const getActiveShows = async (req, res) => {
  try {
    const shows = await Show.find({showDateTime  : {$gte : new Date()}}).populate("movie").sort({showDateTime : 1});  //dont return the past shows
    // shows is an array of show documents you fetched from MongoDB. Each show document contains a reference to a movie document through the movie field.
    const moviesArray = shows.map(show => show.movie);
    // console.log(moviesArray);  //This takes only the movie object from each show:

    //A Set in JavaScript is a collection of unique values. By converting the moviesArray to a Set, you automatically filter out any duplicate movie entries, ensuring that each movie appears only once in the final output.
    const uniqueShows = new Set(moviesArray);
    res.json({ success: true, uniqueShows: Array.from(uniqueShows) });
  }
  catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}