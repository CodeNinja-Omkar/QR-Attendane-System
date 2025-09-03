// src/routes/student.routes.js
// Routes for managing students

import { Router } from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../models/student.model.js";

const router = Router();

// Create student
router.post("/", async (req, res, next) => {
  try {
    const id = await createStudent(req.body);
    const student = await getStudentById(id);
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
});

// Get all students
router.get("/", async (req, res, next) => {
  try {
    const students = await getAllStudents();
    res.json(students);
  } catch (err) {
    next(err);
  }
});

// Get one student
router.get("/:id", async (req, res, next) => {
  try {
    const student = await getStudentById(req.params.id);
    if (!student) return res.status(404).json({ error: "Not found" });
    res.json(student);
  } catch (err) {
    next(err);
  }
});

// Update student
router.put("/:id", async (req, res, next) => {
  try {
    const student = await updateStudent(req.params.id, req.body);
    res.json(student);
  } catch (err) {
    next(err);
  }
});

// Delete student
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await deleteStudent(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
