import React, { useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Calendar, Filter, Users } from "lucide-react";

const EventDashboard = () => {
  const events = useSelector((state) => state.events.events);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateFilter, setDateFilter] = useState("upcoming");

  const categories = ["all", "conference", "workshop", "meetup", "social"];

  const filteredEvents = events.filter((event) => {
    const categoryMatch =
      selectedCategory === "all" || event.category === selectedCategory;
    const eventDate = new Date(event.date);
    const today = new Date();
    const isUpcoming = eventDate >= today;

    return (
      categoryMatch &&
      ((dateFilter === "upcoming" && isUpcoming) ||
        (dateFilter === "past" && !isUpcoming))
    );
  });

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
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="flex items-center text-gray-500 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                {format(new Date(event.date), "PPP")}
              </div>
              <div className="flex items-center text-gray-500 mb-4">
                <Users className="w-4 h-4 mr-2" />
                {event.attendees.length} attendees
              </div>
              <div className="flex justify-between items-center">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {event.category}
                </span>
                <button className="text-blue-600 hover:text-blue-800">
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
