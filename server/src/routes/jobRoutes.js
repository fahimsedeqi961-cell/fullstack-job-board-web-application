import express from "express";
import {
  getALlJobs,
  createJob,
  updateExistingJob,
  deleteExistingJob,
  closeJob,
  getJobsById,
  getCategories,
  featuredJobs,
} from "../controllers/jobController.js";

import { authMiddleware, requireRole } from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/", getALlJobs);

// Get featured jobs only
router.get("/featured", featuredJobs);

// Only authenticated employer creates new job
router.post("/", authMiddleware, requireRole("employer"), createJob);

// Get categories
router.get("/categories", getCategories);

// Get jobs by id
router.get("/:id", getJobsById);

router.patch(
  "/:id",
  authMiddleware,
  requireRole("employer"),
  updateExistingJob,
);

router.patch("/:id/close", authMiddleware, requireRole("employer"), closeJob);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("employer"),
  deleteExistingJob,
);

export default router;
