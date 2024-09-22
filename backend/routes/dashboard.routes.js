import express from "express";
import { addCollaborator, createDashboard, deleteCollaborator, deleteDashboard, getAllAdminDashboards, getAllDashboards, getOneDashboard, updateDashboard } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/:userId", getAllDashboards);
router.get("/one/:userId/:dashboardId", getOneDashboard);
router.get("/admin/:userId", getAllAdminDashboards);
router.post("/create/:userId", createDashboard);
router.post("/collaborators/:dashboardId", addCollaborator);
router.delete("/delete/:dashboardId/:userId", deleteDashboard);
router.put("/collaborators/:dashboardId", deleteCollaborator);
router.put("/:userId", updateDashboard);

export default router;