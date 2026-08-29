import express from "express"
import { register, login, refreshToken, logout } from "../controllers/authController.js";
import { authMiddleware, requireRole } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

router.get("/test",
  authMiddleware,
  requireRole("jobseeker"),
  (req, res) => {
    res.status(200).json({
      message: "This is protected route..."
    });
  })



export default router;