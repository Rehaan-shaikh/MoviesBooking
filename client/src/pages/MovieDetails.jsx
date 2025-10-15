import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlurCircle from "../components/BlurCircle";
import { Heart, PlayCircleIcon, StarIcon, X } from "lucide-react";
import DateSelect from "../components/DateSelect";
import axios from "axios";
import ReactPlayer from "react-player/youtube";

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [dateTime, setDateTime] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false); // ❤️ Track favourite state

  // ✅ Fetch movie + show details
  const getShow = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/movies/getMovieShowDetails/${id}`
      );
      setShow(res.data);
      setDateTime(res.data.dateTime || {});
    } catch (error) {
      console.error("Error fetching show details:", error);
    }
  };

  // ✅ Fetch user's favourite status for this movie
  const checkIfFavourite = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/movies/favourate`,
        { withCredentials: true } // include cookies for auth
      );
      console.log(res.data);
      
      const favMovies = res.data?.favourites || [];
      const exists = favMovies.some((fav) => fav.tmdb_id === id);
      setIsFavourite(exists);
    } catch (error) {
      console.error("Error checking favourites:", error);
    }
  };

  // ✅ Toggle favourite movie
  const toggleFavourite = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/movies/toggleFav/${id}`,
        {},
        { withCredentials: true } // include cookies for auth
      );
      alert(res.data.message);
      setIsFavourite((prev) => !prev); // update instantly
    } catch (error) {
      console.error("Error toggling favourite:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // ✅ Fetch trailer from TMDB
  const getTrailer = async (tmdb_id) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${tmdb_id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );

      const trailer = res.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        setShowTrailer(true);
      } else {
        alert("No official trailer found 😢");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getShow();
      checkIfFavourite(); // check favourite when page loads
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!show) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-400">Loading movie details...</p>
      </div>
    );
  }

  const movie = show.movie || {};
  const baseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={movie.poster_path ? `${baseUrl}${movie.poster_path}` : ""}
          alt={movie.title || "Movie Poster"}
          className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
        />

        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />

          <p className="text-primary">ENGLISH</p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance">
            {movie.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {movie.vote_average?.toFixed(1)} User Rating
          </div>

          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {movie.overview}
          </p>

          <p>
            {movie.runtime} min •{" "}
            {movie.genres?.map((genre) => genre.name).join(", ")} •{" "}
            {movie.release_date?.split("-")[0]}
          </p>

          <div className="flex items-center flex-wrap gap-4 mt-4">
            <button
              onClick={() => getTrailer(movie.tmdb_id)}
              className="flex items-center gap-2 px-7 py-3 text-sm 
              bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium 
              cursor-pointer active:scale-95"
            >
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>

            <button
              className="px-10 py-3 text-sm bg-primary 
              hover:bg-primary-dull transition rounded-md font-medium cursor-pointer 
              active:scale-95"
            >
              Buy Tickets
            </button>

            {/* ❤️ Favourite Button */}
            <button
              onClick={toggleFavourite}
              className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95"
              title={isFavourite ? "Remove from favourites" : "Add to favourites"}
            >
              <Heart
                className={`w-5 h-5 transition ${
                  isFavourite ? "fill-red-500 text-red-500" : "text-white"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Cast Section */}
      {movie.casts?.length > 0 && (
        <>
          <p className="text-lg font-medium mt-20">Your Favorite Cast</p>
          <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
            <div className="flex items-center gap-4 w-max px-4">
              {movie.casts.slice(0, 12).map((cast, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <img
                    src={
                      cast.profile_path
                        ? `${baseUrl}${cast.profile_path}`
                        : "https://via.placeholder.com/80"
                    }
                    alt={cast.name}
                    className="rounded-full h-20 md:h-20 aspect-square object-cover"
                  />
                  <p className="font-medium text-xs mt-3">{cast.name}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <DateSelect dateTime={dateTime} id={id} />

      {/* 🎥 Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-3xl aspect-video bg-black rounded-lg">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-3 right-3 text-white bg-gray-800 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <ReactPlayer
              url={trailerUrl}
              controls
              width="100%"
              height="100%"
              playing
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
