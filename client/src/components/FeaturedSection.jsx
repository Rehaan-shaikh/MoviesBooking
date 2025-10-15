/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import BlurCircle from "./BlurCircle";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import MovieCard from "./MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { getActiveShows } from "../store/admin/show-slice";


const FeaturedSection = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();

    const { shows, isLoading } = useSelector((state) => state.shows);
    console.log(shows,"gtr");

    useEffect(() => {
    dispatch(getActiveShows());
  }, [dispatch]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle top="0" right="-80px" />
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>
        <button
          onClick={() => navigate("/movies")}
          className="group flex items-center gap-2 text-sm text-gray-300 cursor-pointer"
        >
          View All
          <ArrowRight className="group-hover:translate-x-0.5 transition w-4 h-4" />
        </button>
      </div>

      {/* your movie cards will go here (improve the styling from gird to flex box(responsiveness issue) 1.32.18) */}
        <div className="flex flex-wrap max-sm:justify-center gap-8
    mt-8">
        {shows.slice(0, 4).map((show) => (
            <MovieCard key={show._id} movie={show} />
        ))}
        </div>


      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate("/movies");
            window.scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default FeaturedSection;
