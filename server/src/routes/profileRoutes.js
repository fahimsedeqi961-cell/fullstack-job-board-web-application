import express from "express"
import {
  createEmpProfile,
  getProfile,
  updateProfile
} from "../controllers/profileController.js";

import { authMiddleware, requireRole } from "../middleware/authmiddleware.js";

const router = express.Router();


router.get("/",
  authMiddleware,
  requireRole("employer"),
  getProfile
);
router.post("/",
  authMiddleware,
  requireRole("employer"),
  createEmpProfile
);
router.patch("/:id",
  authMiddleware,
  requireRole("employer"),
  updateProfile
);


export default router;