import express from "express"
import { applyForJob, deleteApplication, getApplicationById, getEmpApplications, getMyApplications, updateEmployerApp } from "../controllers/applicationController.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/:id",
  authMiddleware,
  applyForJob
);

router.get("/",
  authMiddleware,
  getMyApplications
);

router.get("/employer",
  authMiddleware,
  getEmpApplications
);

router.get("/:id",
  authMiddleware,
  getApplicationById
);

router.delete("/:id",
  authMiddleware,
  deleteApplication
);



router.patch("/employer/:id",
  authMiddleware,
  updateEmployerApp
);


export default router;