/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import isoTimeFormat from "../lib/isoDateTime";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import BlurCircle from "../components/BlurCircle";
import axios from "axios";
import SelectMeals from "../components/selectMeals";

const SeatLayout = () => {
  const groupRows = [
    ["A", "B", "C"],
    ["D", "E", "F"],
    ["G", "H", "I"],
  ];

  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]); // [{ foodId, quantity }]

  const navigate = useNavigate();

  // 🎬 Fetch show info
  const getShow = async () => {
    const foundShow = await axios.get(
      `http://localhost:3000/api/show/shows/${id}/${date}`
    );

    if (foundShow) {
      setShow({
        movie: foundShow.data.movie,
        dateTime: foundShow.data.showTimings,
      });
    }
  };

  // 🍔 Fetch food items
  const getFoods = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/food");
      if (data.success) {
        setFoods(data.foods);
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  // 🎟 Handle seat selection
  const handleSeatClick = (seatId) => {
    if (!selectedTime?.time) return alert("Please select time first");

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return alert("You can select up to 5 seats only");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  // 🚫 Get occupied seats
  const getOccupiedSeats = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/booking/seats/${selectedTime.showId}`
      );

      if (data.success) {
        setOccupiedSeats(data.occupiedSeats);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Book ticket with selected foods
  const BookTicket = async () => {
    try {
      if (!selectedSeats.length || !selectedTime)
        return alert("Please select time and seat.");

      const booking = await axios.post(
        `http://localhost:3000/api/booking/create`,
        {
          showId: selectedTime.showId,
          selectedSeats,
          foods: selectedFoods, // 👈 Added this field
        },
        { withCredentials: true }
      );

      if (booking.data.success) {
        alert("Booking successful!");
        navigate("/my-bookings");
      } else {
        alert(booking.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.message || "Error while booking");
    }
  };

  useEffect(() => {
    getShow();
    getFoods();
  }, []);

  useEffect(() => {
    if (selectedTime) getOccupiedSeats();
  }, [selectedTime]);

  if (!show) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-400">Loading seat layout...</p>
      </div>
    );
  }

  const timingsForDate = show.dateTime?.[date] || [];

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex flex-col md:flex-row mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              disabled={occupiedSeats.includes(seatId)}
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer transition
                ${
                  selectedSeats.includes(seatId)
                    ? "bg-primary text-white"
                    : "hover:bg-primary/10"
                }
                ${occupiedSeats.includes(seatId) ? "opacity-50" : ""}
              `}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row px-16 lg:px-40 py-10 md:pt-50">
      {/* 🎞 Available Timings */}
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg p-10 h-max sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available Timings</p>
        <div className="mt-5 space-y-1">
          {timingsForDate.length > 0 ? (
            timingsForDate.map((item) => (
              <div
                key={item.time}
                onClick={() => setSelectedTime(item)}
                className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition 
                  ${
                    selectedTime?.time === item.time
                      ? "bg-primary text-white"
                      : "hover:bg-primary/20"
                  }`}
              >
                <ClockIcon className="w-4 h-4" />
                <p className="text-sm">{isoTimeFormat(item.time)}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 px-6">No shows on this date.</p>
          )}
        </div>
      </div>

      {/* 🪑 Seats + Meals */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />

        <h1 className="text-2xl font-semibold mb-4">Select your seat</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

        <div className="flex flex-col items-center mt-10 text-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>
          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>{group.map((row) => renderSeats(row))}</div>
            ))}
          </div>
        </div>

        {/* 🍿 Food selection */}
        <div className="mt-16 w-full max-w-2xl">
          <SelectMeals
            foods={foods}
            selectedFoods={selectedFoods}
            setSelectedFoods={setSelectedFoods}
          />
        </div>

        <button
          onClick={BookTicket}
          className="flex items-center gap-1 mt-10 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full cursor-pointer active:scale-95"
        >
          Proceed to Checkout
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;
