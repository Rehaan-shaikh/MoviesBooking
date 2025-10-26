import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Title from "./component/Title.jsx";
import { dateFormat } from "../../Lib/dateFormat.js";

const ListBookings = () => {
  const [bookings, setBookings] = useState([]);
  const getAllBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/admin/list-bookings"
      );
      setBookings(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllBookings();
  }, []);
  return (
    <>
      <Title text1="List" text2="Bookings" />
      <div className="max-w-4x1 mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 font-medium">Movie Name</th>
              <th className="p-2 font-medium pl-5">User Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Seats</th>
              <th className="p-2 font-medium">Food Items</th>
              <th className="p-2 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {bookings.map((item, index) => (
              <tr
                key={index}
                className="border-b border-primary/20 bg-primary/5 even:bg-primary/10"
              >
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="h-16 w-12 flex-shrink-0">
                      <img
                        className="h-16 w-12 rounded object-cover"
                        src={`https://image.tmdb.org/t/p/w500${item.show?.movie?.poster_path}`}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium">
                        {item.show?.movie?.title}
                      </div>
                    </div>
                  </div>
                  {/* {item.show?.movie?.title} */}
                </td>
                <td className="p-2 min-w-45 pl-5">{item.user?.name}</td>
                <td className="p-2">{dateFormat(item.show?.showDateTime)}</td>
                <td className="p-2">
                  {Object.keys(item.bookedSeats || {})
                    .map((seat) => item.bookedSeats[seat])
                    .join(", ")}
                </td>
                <td className="p-2">
                  {/* needs styling */}
                  {(item.foods || []).map((f)=> f.food?.name)}
                </td>
                <td className="p-2">${item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListBookings;
