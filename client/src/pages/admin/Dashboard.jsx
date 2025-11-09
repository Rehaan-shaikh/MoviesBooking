import React, { useState, useEffect } from "react";
import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import BlurCircle from "../../components/BlurCircle";
import Title from "./component/Title";
import axios from "axios";
import { getActiveShowsForAdmin } from "../../store/showSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { shows, isLoading: showsLoading } = useSelector((state) => state.shows);
  // console.log(shows);
  

  const [dashboardData, setDashboardData] = useState({});
  // const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard stats
  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin");
      setDashboardData(res.data.data); // fetch data object
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

    const fetchDashboardShows = async () => {
    try {
      dispatch(getActiveShowsForAdmin());
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardShows();
    fetchDashboardData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prepare cards from dashboardData
  const cards = [
    {
      title: "Total Users",
      value: dashboardData.totalUsers,
      icon: UsersIcon,
    },
    {
      title: "Active Shows",
      value: dashboardData.totalActiveShows,
      icon: PlayCircleIcon,
    },
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings,
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: `${dashboardData.totalRevenue || 0} ₹`,
      icon: CircleDollarSignIcon,
    },
  ];

  if (loading || showsLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Title text1="Admin" text2="Dashboard" />

      {/* Dashboard Cards */}
      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurCircle top="-100px" left="0" />
        <div className="flex flex-wrap gap-4 w-full">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded md:max-w-56 w-full sm:w-[45%] lg:w-[23%]"
            >
              <div>
                <h1 className="text-sm text-gray-400">{card.title}</h1>
                <p className="text-xl font-semibold mt-1">{card.value}</p>
              </div>
              <card.icon className="w-6 h-6 text-primary" />
            </div>
          ))}
        </div>
      </div>

      {/* Active Shows */}
      <p className="mt-10 text-lg font-medium">Active Shows</p>
      <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
        <BlurCircle top="100px" left="-10%" />
        {shows.map((show) => (
          <div
            key={show.movie._id}
            className="w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${show.movie.poster_path}`}
              alt={show.movie.title}
              className="h-60 w-full object-cover"
            />
            <p className="font-medium p-2 truncate">{show.movie.title}</p>

            <div className="flex items-center justify-between px-2">
              <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
                <StarIcon className="w-4 h-4 text-primary fill-primary" />
                {show.movie.vote_average?.toFixed(1)}
              </p>
            </div>

            <p className="px-2 pt-2 text-sm text-gray-500">
              Release Date: {show.movie.release_date}
            </p>

            {/* Showtimes */}
            <div className="px-2 pt-2">
              <p className="text-sm font-medium text-primary">Upcoming Shows:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {show.showTimes.map((t) => (
                  <span
                    key={t._id}
                    className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-md"
                  >
                    {new Date(t.showDateTime).toLocaleString([], {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                    {t.showPrice ? ` - ${t.showPrice} ₹` : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

      </div>
    </>
  );
};

export default Dashboard;
