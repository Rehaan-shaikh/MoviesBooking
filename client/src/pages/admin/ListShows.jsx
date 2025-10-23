import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "./component/Title.jsx";
import { dateFormat } from "../../Lib/dateFormat.js";

const ListShows = () => {
  const [shows, setShows] = useState([]);
  const getAllShows = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/list-shows");
      setShows(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllShows();
  }, []);

  return (
    <>
      <Title text1="List" text2="Shows" />
      <div className="max-w-4x1 mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 font-medium pl-5">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Total Bookings</th>
              <th className="p-2 font-medium">Earnings</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {shows.map((show, index) => (
              <tr
                key={index}
                className="border-b border-primary/10 bg-primary/5 even:bg-primary/10"
              >
                <td className="p-2 min-w-45 pl-5">
                  <div className="flex items-center">
                    <div className="h-16 w-12 flex-shrink-0">
                      <img
                        className="h-16 w-12 rounded object-cover"
                        src={`https://image.tmdb.org/t/p/w500${show.movie?.poster_path}`}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium">{show.movie?.title}</div>
                    </div>
                  </div>
                  {/* {show.movie?.title} */}
                </td>
                <td className="p-2">{dateFormat(show.showDateTime)}</td>
                <td className="p-2">
                  {Object.keys(show.occupiedSeats || {}).length}
                </td>
                <td className="p-2">
                  $
                  {Object.keys(show.occupiedSeats || {}).length *
                    show.showPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListShows;
