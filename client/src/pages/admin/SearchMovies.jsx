import React, { useState } from "react";
import axios from "axios";
import { SearchIcon, Loader, StarIcon, PlusCircle } from "lucide-react";
import Title from "./component/Title";
import BlurCircle from "../../components/BlurCircle";
import { kConverter } from "../../Lib/kConverter";

const SearchMovies = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  console.log(searchTitle);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let query = searchTitle;
    if (query.trim() == "") {
      return setSearchResult([]);
    }
    setSearchResult([]);
    try {
      const response = await axios
        .post("http://localhost:3000/api/search/movie-search", {query})
        .then((response) => {
          // console.log(response);
          //date dekko change karne ka tha mereko
          setSearchResult(response.data?.movies || []); // store fetched data in state
          // console.log(nowPlayingMovies);
        });
      setSearchTitle("");
      console.log(response);
      
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="relative min-h-[80vh] text-white">
      <BlurCircle top="0px" right="0px" />
      <Title text1="Search" text2="Movies" />

      {/* Search Bar Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 mb-10 w-full max-w-xl relative"
      >
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="Search for movies by title..."
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-primary outline-none transition"
        />
        <button
          type="submit"
          className="absolute right-3 pr-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
        >
          <SearchIcon className="w-5 h-5" />
        </button>
      </form>
      <p className="mt-10 text-lg font-medium">Searched Movies</p>
      <div className="overflow-x-auto pb-4">
        <div className="group flex flex-wrap gap-4 mt-4 w-max">
          {searchResult.map((movie) => (
            <div
              key={movie.id}
              className="relative max-w-40 cursor-pointer
              group-hover:not-hover:opacity-40 hover:-translate-y-1 transition
              duration-300"
              //   onClick={() => setSelectedMovie(movie.id)}
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                  className="w-full object-cover brightness-90"
                />
                <div
                  className="text-sm flex items-center justify-between
                p-2 bg-black/70 w-full absolute bottom-0 left-0"
                >
                  <p
                    className="flex items-center gap-1
                  text-gray-400"
                  >
                    <StarIcon
                      className="w-4 h-4 text-primary
                    fill-primary"
                    />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="text-gray-300">
                    {kConverter(movie.vote_count)}
                    Votes
                  </p>
                </div>
              </div>
              {/* {selectedMovie === movie._id && (
                <div
                  className="absolute top-2 right-2 flex items-center
                justify-center bg-primary h-6 w-6 rounded"
                >
                  <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              )} */}
              <p className="font-medium truncate">{movie.title}</p>
              <p className="text-gray-400 text-sm">{movie.release_date}</p>
            </div>
          ))}
        </div>
        <button className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer">
          Move To Add Show
        </button>
      </div>
    </div>
  );
};

export default SearchMovies;
