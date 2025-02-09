import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
  createEvent,
  getEvents,
  joinEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", verifyJWT, upload.single("image"), createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/:id/join", verifyJWT, joinEvent);
router.put("/:id", verifyJWT, upload.single("image"), updateEvent);
router.delete("/:id", verifyJWT, deleteEvent);

export default router;
