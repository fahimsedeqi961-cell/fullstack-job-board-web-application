import express from "express"
import { applyForJob, deleteApplication, getApplicationById, getEmpApplications, getMyApplications, updateEmployerApp } from "../controllers/applicationController.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

const router = express.Router();

// submit or create a new job-seeker application
router.post("/:id",
  authMiddleware,
  applyForJob
);

// Get all job-seeker applications
router.get("/my-applications",
  authMiddleware,
  getMyApplications
);

// Get all employer job applications
router.get("/employer",
  authMiddleware,
  getEmpApplications
);

// Get one job-seeker application by id
router.get("/:id",
  authMiddleware,
  getApplicationById
);

// Delete the job-seeker application by id
router.delete("/:id",
  authMiddleware,
  deleteApplication
);

// Update employer jobs application
router.patch("/employer/:id/status",
  authMiddleware,
  updateEmployerApp
);


export default router;