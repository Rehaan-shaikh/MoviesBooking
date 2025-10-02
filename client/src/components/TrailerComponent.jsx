import React, { useState } from "react";
import ReactPlayer from "react-player";
import BlurCircle from "./BlurCircle";
import { PlayCircleIcon } from "lucide-react";
import { dummyTrailers } from "../assets/assets";

const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <div className="relative px-6 md:px-16 lg:px-24 xl:px-44 pt-30 py-20 overflow-hidden">
      <BlurCircle top="10px" left="400px" />
      <p className="text-gray-300 font-bold text-lg max-w-[960px] mx-auto">
        Trailers
      </p>

      <div className="relative mt-6">
        <BlurCircle top="-100px" right="-100px" />
        {/* If your <ReactPlayer /> component doesn't show the YouTube video even though everything seems correct — it's likely because you're using react-player version 3.x, which introduced breaking changes.✅ Fix: Downgrade to the version used in this tutorial: npm install react-player@2.10.1 */}
        <ReactPlayer
        url={currentTrailer.videoUrl}
        controls={true}
        className="mx-auto max-w-full"
        width="960px"
        height="540px"
        />

      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">
        {dummyTrailers.map((trailer) => (
          <div
            key={trailer.image}
            onClick={() => setCurrentTrailer(trailer)}
            className="relative hover:-translate-y-1 transition duration-300 cursor-pointer"
          >
            <img
              src={trailer.image}
              alt="trailer"
              className="rounded-lg w-full h-full object-cover brightness-75"
            />
            <PlayCircleIcon
              strokeWidth={1.6}
              className="absolute top-1/2 left-1/2 w-8 h-8 md:w-12 md:h-12 transform -translate-x-1/2 -translate-y-1/2 text-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailersSection;
