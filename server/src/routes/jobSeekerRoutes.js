import express from "express"
import { createProfile, getProfile, updateProfile } from "../controllers/jobSeekerController.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

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


export default router;
