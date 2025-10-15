import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlurCircle from "../components/BlurCircle";
import MovieCard from "../components/MovieCard";
import { getActiveShows } from "../store/admin/show-slice";

const Movies = () => {
  const dispatch = useDispatch();
  const { shows, isLoading } = useSelector((state) => state.shows);

  useEffect(() => {
    dispatch(getActiveShows());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-400">Loading movies...</p>
      </div>
    );
  }

  return shows && shows.length > 0 ? (
    <div
      className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44
    overflow-hidden min-h-[80vh]"
    >
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="50px" right="50px" />
      <h1 className="text-lg font-medium my-4 text-gray-300">Now Showing</h1>

      <div className="flex flex-wrap max-sm:justify-center gap-8 mt-8">
        {shows.map((show) => (
          <MovieCard movie={show} key={show._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-300">
        No movies available
      </h1>
    </div>
  );
};

export default Movies;
