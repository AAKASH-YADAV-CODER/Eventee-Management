import { Event } from "../models/event.model.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js";
import fs from "fs";

export const createEvent = async (req, res) => {
  try {
    // Check if user exists in request
    if (!req.user?._id) {
      return res.status(401).json({
        message: "Unauthorized - Please login first",
      });
    }

    const { name, description, date, category, location } = req.body;
    let imageUrl = null;

    // Handle image upload if present
    if (req.file) {
      // Upload to Cloudinary
      const result = await uploadOnCloudinary(req.file.path);
      if (result) {
        imageUrl = result.secure_url;
        // Clean up the temporary file
        fs.unlinkSync(req.file.path);
      }
    }

    // Create the event with the image URL
    const event = new Event({
      name,
      description,
      date,
      category,
      location,
      image: imageUrl,
      organizer: req.user._id,
      attendees: [],
    });

    await event.save();

    // Populate organizer details
    const populatedEvent = await Event.findById(event._id)
      .populate("organizer", "name email")
      .populate("attendees", "name email");

    res.status(201).json(populatedEvent);
  } catch (error) {
    // Clean up uploaded file if there's an error
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }

    console.error("Event creation error:", error);
    res.status(500).json({
      message: error.message || "Failed to create event",
    });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("organizer", "name email")
      .populate("attendees", "name email")
      .sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const joinEvent = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        message: "Unauthorized - Please login first",
      });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user is already attending
    if (event.attendees.includes(req.user._id)) {
      return res.status(400).json({ message: "Already attending this event" });
    }

    event.attendees.push(req.user._id);
    await event.save();

    const populatedEvent = await Event.findById(event._id)
      .populate("organizer", "name email")
      .populate("attendees", "name email");

    res.json(populatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name email")
      .populate("attendees", "name email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user is the organizer
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this event" });
    }

    const { name, description, date, category, location } = req.body;
    let imageUrl = event.image; // Keep existing image by default

    // Handle new image upload if present
    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);
      if (result) {
        imageUrl = result.secure_url;
        // Clean up the temporary file
        fs.unlinkSync(req.file.path);
      }
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        date,
        category,
        location,
        image: imageUrl,
      },
      { new: true }
    )
      .populate("organizer", "name email")
      .populate("attendees", "name email");

    res.json(updatedEvent);
  } catch (error) {
    // Clean up uploaded file if there's an error
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user is the organizer
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this event" });
    }

    // Delete the event's image from Cloudinary if it exists
    if (event.image) {
      // Extract public_id from the Cloudinary URL
      const publicId = event.image.split("/").pop().split(".")[0];
      await deleteFromCloudinary(publicId);
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to delete image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    // You'll need to implement this using your Cloudinary configuration
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};
