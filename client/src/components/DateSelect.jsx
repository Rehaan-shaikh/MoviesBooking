import React, { useState } from "react";
import BlurCircle from "./BlurCircle";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  // console.log(dateTime);
  
  const [date, setDate] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    if (date) {
      // Navigate to /movies/:id/:date (example: /movies/941109/2025-10-12)
      navigate(`/movies/${id}/${date}`);
    } else {
      alert("Please select a date first!");
    }
  };

  return (
    <div id="dateSelect" className="pt-30">
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-10
        relative p-8 bg-primary/10 border border-primary/20 rounded-lg"
      >
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />

        <div>
          <p className="text-lg font-semibold">Choose Date</p>
          <div className="flex items-center gap-6 text-sm mt-5">
            <ChevronLeftIcon width={28} />
            <span
              className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4"
            >
              {Object.keys(dateTime).map((d) => (
                <button
                  onClick={() => setDate(d)} // ✅ fixed here
                  key={d}
                  className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${
                    date === d ? "bg-primary text-white" : "bg-gray-700"
                  }`}
                >
                  <span>{new Date(d).getDate()}</span>
                  <span>
                    {new Date(d).toLocaleString("en-US", { month: "short" })}
                  </span>
                </button>
              ))}
            </span>
            <ChevronRightIcon width={28} />
          </div>
        </div>

        <button
          onClick={handleClick}
          className="bg-primary text-white px-8 py-2 mt-6 rounded 
        hover:bg-primary/90 transition-all cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
