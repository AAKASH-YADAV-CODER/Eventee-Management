import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Calendar,
  Users,
  MapPin,
  Edit2,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { fetchEventById, deleteEvent } from "../../store/slices/eventSlice";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.events.currentEvent);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);

  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const result = await dispatch(deleteEvent(id));
      if (!result.error) {
        navigate("/dashboard");
      }
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          Error: {error.message || "Something went wrong"}
        </div>
      </div>
    );
  }

  if (loading || !event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const isOwner = user?._id === event.organizer._id;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Events
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
          {event.image ? (
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-96 object-cover"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
              <Calendar className="w-24 h-24 text-gray-400" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-48" />
        </div>

        <div className="relative p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {event.name}
              </h1>
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                {event.category}
              </span>
            </div>
            {isOwner && (
              <div className="flex gap-4">
                <button
                  onClick={() => navigate(`/event/edit/${event._id}`)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-3" />
              <span>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-3" />
              <span>{event.attendees.length} attendees</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-3" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">About this event</h2>
            <p className="text-gray-600 whitespace-pre-line">
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
