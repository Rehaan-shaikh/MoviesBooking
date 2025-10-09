/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { dummyDashboardData } from "../../assets/assets";
import {
  ChartLineIcon,
  CircleDollarSignIcon,
  Loader,
  LucideClockFading,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import BlurCircle from "../../components/BlurCircle";
import Title from "./component/Title";
import { getActiveShows } from "../../store/admin/show-slice";

const Dashboard = () => {
  // const currency = import.meta.env.VITE_CURRENCY || "rupee";
  const dispatch = useDispatch();
    const { shows, isLoading } = useSelector((state) => state.shows);
    console.log(shows,"gtr");
    
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || "0",
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: dashboardData.totalRevenue || "0",
      icon: CircleDollarSignIcon,
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length || "0",
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || "0",
      icon: UsersIcon,
    },
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData); // Placeholder: This is where API call would go
    setLoading(false);
  };

  useEffect(() => {
    dispatch(getActiveShows());
  }, [dispatch]);

  const Dashboard = () => {
    const { totalBookings, totalRevenue, totalUser, activeShows } =
      dummyDashboardData;
  };
  return (
    <>
      <Title text1="Admin" text2="Dashboard" />

      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurCircle top="-100px" left="0" />

        <div className="flex flex-wrap gap-4 w-full">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded md:max-w-50 w-full"
            >
              <div>
                <h1 className="text-sm">{card.title}</h1>
                <p className="text-xl font-medium mt-1">{card.value}</p>
              </div>

              <card.icon className="w-6 h-6" />
            </div>
          ))}
        </div>
      </div>
      <p className="mt-10 text-lg font-medium">Active Shows</p>
      <div className="relative flex flex-wrap gap-6 mt-4 max-w-5x1">
        <BlurCircle top="100px" left="-10%" />

      {shows.map((show) => (
        <div
          key={show._id}
          className="w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} // ✅ Add TMDB base URL if needed
            alt={show.title}
            className="h-60 w-full object-cover"
          />

          <p className="font-medium p-2 truncate">{show.title}</p>

          <div className="flex items-center justify-between px-2">
            {/* If showPrice is not available, you can skip it or show N/A */}
            <p className="text-lg font-medium">
              {show.showPrice ? `$${show.showPrice}` : "N/A"}
            </p>

            <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
              <StarIcon className="w-4 h-4 text-primary fill-primary" />
              {show.vote_average?.toFixed(1)}
            </p>
          </div>

          <p className="px-2 pt-2 text-sm text-gray-500">
            Release Date: {show.release_date}
          </p>
        </div>
      ))}

      </div>
    </>
  );
};

export default Dashboard;