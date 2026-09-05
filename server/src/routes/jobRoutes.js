import express from "express";
import { getALlJobs, createJob, updateExistingJob, deleteExistingJob, closeJob, getJobsById } from "../controllers/jobController.js";
import { authMiddleware, requireRole } from "../middleware/authmiddleware.js";


const router = express.Router();


router.get("/", getALlJobs);
router.get("/:id", getJobsById);

// Only authenticated employer creates new job
router.post("/",
  authMiddleware,
  requireRole("employer"),
  createJob
);
router.patch("/:id",
  authMiddleware,
  requireRole("employer"),
  updateExistingJob
);

router.patch("/:id/close",
  authMiddleware,
  requireRole("employer"),
  closeJob
);

router.delete("/:id",
  authMiddleware,
  requireRole("employer"),
  deleteExistingJob
);



export default router;