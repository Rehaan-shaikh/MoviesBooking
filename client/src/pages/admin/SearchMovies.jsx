import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  SearchIcon,
  Loader,
  StarIcon,
  PlusCircle,
  CheckIcon,
  DeleteIcon,
} from "lucide-react";
import Title from "./component/Title";
import BlurCircle from "../../components/BlurCircle";
import { kConverter } from "../../Lib/kConverter";
import { useDispatch } from "react-redux";
import { addShow } from "../../store/admin/show-slice";
import { toast } from "react-toastify";

const SearchMovies = () => {
  const dispatch = useDispatch();
  const [searchTitle, setSearchTitle] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showPrice, setShowPrice] = useState("");
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showsInput, setShowsInput] = useState([
    {
      date: "",
      time: [],
    },
  ]);
  // console.log(searchTitle);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let query = searchTitle;
    if (query.trim() == "") {
      return setSearchResult([]);
    }
    setSearchResult([]);
    try {
      const response = await axios
        .post("http://localhost:3000/api/search/movie-search", { query })
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

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || []; //times is an array of time for a perticular date
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev; //if time for a perticular date exist, then dont do (add) anything
    });
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);

      if (filteredTimes.length === 0) {
        //ie if a perticular date doesnt have any longer time of show,
        //this below line then,
        // 1. [date] → dynamically uses the value of the variable date as a key.
        // So [date] becomes "2025-10-09".
        // 2. { [date]: _, ...rest } = prev
        // This destructures the object prev.
        // It extracts the property with key "2025-10-09" and assigns it to _ (we don’t need it, so _ is just a throwaway variable).
        // ...rest collects all remaining properties of the object into a new objec
        const { [date]: _, ...rest } = prev;
        return rest;
      }

      return {
        //it gets return if the data has some some time of show
        ...prev,
        [date]: filteredTimes,
      };
    });
  };

  const handleAddShow = async () => {
    // const isFieldEmpty = movieId && dateTimeSelection && showPrice;
    try {
      const payload = {
        movieId: selectedMovie,
        showsInput: showsInput,
        showPrice: showPrice,
      };
      if (!payload) return toast("Enter All Information To Add a Show");
      const res = await dispatch(addShow(payload));
      if (!res.payload?.success) {
        return toast(res.payload?.message || "Failed to add show");
      }
      console.log(res);
      toast("Show Added Successfully");
      // ✅ Reset all states after success
      setSelectedMovie(null);
      setDateTimeSelection({});
      setDateTimeInput("");
      setShowPrice("");
      setShowsInput([{ date: "", time: [] }]);
    } catch (error) {
      console.error("Error while Adding Show", error);
    }
  };

    useEffect(() => {
      const transformed = Object.keys(dateTimeSelection).map((key) => ({
        date: key,
        time: dateTimeSelection[key],
      }));
      setShowsInput(transformed);
    }, [dateTimeSelection]);

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
              className="relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300"
              onClick={() => setSelectedMovie(movie.id)}
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                  className="w-full object-cover brightness-90"
                />
                <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                  <p className="flex items-center gap-1 text-gray-400">
                    <StarIcon className="w-4 h-4 text-primary fill-primary" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="text-gray-300">
                    {kConverter(movie.vote_count)}
                    Votes
                  </p>
                </div>
              </div>
              {selectedMovie === movie.id && (
                <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded">
                  <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              )}
              <p className="font-medium truncate">{movie.title}</p>
              <p className="text-gray-400 text-sm">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Show Price Input */}
      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Show Price</label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
          <p className="text-gray-400 text-sm">$</p>
          <input
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter show price"
            className="outline-none"
          />
        </div>
      </div>

      {/* Date & Time Selection */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">
          Select Date and Time
        </label>
        <div className="inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="outline-none rounded-md"
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer"
          >
            Add Time
          </button>
        </div>
      </div>

      {Object.keys(dateTimeSelection).length > 0 && ( //Object.keys returns an array of keys
        <div className="mt-6">
          <h2 className="mb-2">Selected Date-Time</h2>
          <ul className="space-y-3">
            {Object.entries(dateTimeSelection).map(
              (
                [date, times] //Object.entries() is a JavaScript method that returns an array of key-value pairs from an object.
              ) => (
                <li key={date}>
                  <div className="font-medium">{date}</div>
                  <div className="flex flex-wrap gap-2 mt-1 text-sm">
                    {times.map((time) => (
                      <div
                        key={time}
                        className="border border-primary px-2 py-1 flex items-center rounded"
                      >
                        <span>{time}</span>
                        <DeleteIcon
                          onClick={() => handleRemoveTime(date, time)}
                          width={15}
                          className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      )}

      <button
        className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer"
        onClick={handleAddShow}
      >
        Add Show
      </button>
      {/* <button className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer">
          Move To Add Show
        </button> */}
    </div>
  );
};

export default SearchMovies;
