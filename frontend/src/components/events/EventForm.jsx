import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "../../store/slices/eventSlice";
import { Calendar, MapPin, Type, FileText, Tag, Image } from "lucide-react";
import { toast } from "react-toastify";
const EventForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    category: "conference",
    location: "",
    image: null,
    imagePreview: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a new FormData object for the API call
      const eventFormData = new FormData();

      // Append all non-image fields
      Object.keys(formData).forEach((key) => {
        if (key !== "image" && key !== "imagePreview") {
          eventFormData.append(key, formData[key]);
        }
      });

      // Append image if it exists
      if (formData.image) {
        eventFormData.append("image", formData.image);
      }

      // Pass the FormData object to the createEvent action
      await dispatch(createEvent(eventFormData)).unwrap();
      toast.success("Event created successfully");

      // Reset form after successful submission
      setFormData({
        name: "",
        description: "",
        date: "",
        category: "conference",
        location: "",
        image: null,
        imagePreview: null,
      });
    } catch (error) {
      console.error("Failed to create event:", error);
      // Handle error (show notification, etc.)
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        setFormData({
          ...formData,
          image: file,
          imagePreview: URL.createObjectURL(file),
        });
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Type className="w-4 h-4 mr-2" />
            Event Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 mr-2" />
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            Date and Time
          </label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Tag className="w-4 h-4 mr-2" />
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="conference">Conference</option>
            <option value="workshop">Workshop</option>
            <option value="meetup">Meetup</option>
            <option value="social">Social</option>
          </select>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Image className="w-4 h-4 mr-2" />
            Event Image
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              {formData.imagePreview ? (
                <div className="relative w-full h-full">
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm">Click to change image</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Image className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG or JPEG (MAX. 800x400px)
                  </p>
                </div>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
