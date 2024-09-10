import express from "express";
import { addCollaborator, createDashboard, deleteCollaborator, deleteDashboard, updateDashboardItems } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.post("/create/:userId", createDashboard);
router.post("/collaborators/:dashboardId", addCollaborator);
router.delete("/delete/:dashboardId/:userId", deleteDashboard);
router.put("/collaborators/:dashboardId", deleteCollaborator);
router.put("/items/:userId", updateDashboardItems);

export default router;