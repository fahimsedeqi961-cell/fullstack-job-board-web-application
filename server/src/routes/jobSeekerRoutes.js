import express from "express"
import { createProfile, getProfile, updateProfile } from "../controllers/jobSeekerController.js";
import { authMiddleware } from "../middleware/authmiddleware.js";
import { saveJobs, getSavedJobs, removeSavedJobs } from "../controllers/jobSeekerController.js";

const router = express.Router();

router.get("/profile",
  authMiddleware,
  getProfile
);

router.post("/profile",
  authMiddleware,
  createProfile
);
router.patch("/profile",
  authMiddleware,
  updateProfile
);


router.post("/saved-jobs/:jobId",
  authMiddleware,
  saveJobs
);

router.get("/saved-jobs",
  authMiddleware,
  getSavedJobs
);

router.delete("/saved-jobs/:jobId",
  authMiddleware,
  removeSavedJobs
);

export default router;
