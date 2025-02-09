import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Calendar, Users, MapPin } from "lucide-react";
import { fetchEvents } from "../../store/slices/eventSlice";
import { useNavigate } from "react-router-dom";

const EventDashboard = () => {
  const events = useSelector((state) => state.events.events);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = ["all", "conference", "workshop", "meetup", "social"];

  const filteredEvents = events.filter((event) => {
    if (selectedCategory !== "all" && event.category !== selectedCategory) {
      return false;
    }
    return selectedCategory === "all"
      ? event
      : event.category === selectedCategory;
  });

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Event Dashboard</h1>
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {event.image ? (
              <div className="w-full h-48 relative">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-24" />
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {event.description}
              </p>
              <div className="flex items-center text-gray-500 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(event.date).toLocaleDateString()}
              </div>
              <div className="flex items-center text-gray-500 mb-2">
                <Users className="w-4 h-4 mr-2" />
                {event.attendees.length} attendees
              </div>
              <div className="flex items-center text-gray-500 mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                {event.location}
              </div>
              <div className="flex justify-between items-center">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {event.category}
                </span>
                <button
                  onClick={() => navigate(`/event/${event._id}`)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDashboard;
