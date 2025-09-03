 //src/routes/session.routes.js
// Routes for managing sessions

import { Router } from "express";
import {
  createSession,
  getAllSessions,
  getSessionById,
  deleteSession,
} from "../models/session.model.js";

const router = Router();

// Create session
router.post("/", async (req, res, next) => {
  try {
    const { subject, division, session_date } = req.body;
    if (!subject || !division || !session_date) {
      return res.status(400).json({ error: "subject, division, session_date required" });
    }
    const id = await createSession({ subject, division, session_date });
    const session = await getSessionById(id);
    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
});

// Get all sessions
router.get("/", async (req, res, next) => {
  try {
    const sessions = await getAllSessions();
    res.json(sessions);
  } catch (err) {
    next(err);
  }
});

// Get one session
router.get("/:id", async (req, res, next) => {
  try {
    const session = await getSessionById(req.params.id);
    if (!session) return res.status(404).json({ error: "Not found" });
    res.json(session);
  } catch (err) {
    next(err);
  }
});

// Delete session
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await deleteSession(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;