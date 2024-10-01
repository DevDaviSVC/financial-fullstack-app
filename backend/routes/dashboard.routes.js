import express from "express";
import { addCollaborator, createDashboard, deleteCollaborator, deleteDashboard, getAllAdminDashboards, getAllDashboards, getOneDashboard, updateDashboard } from "../controllers/dashboard.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getAllDashboards);
router.get("/one/:dashboardId", protectRoute, getOneDashboard);
router.get("/admin", protectRoute, getAllAdminDashboards);
router.post("/create", protectRoute, createDashboard);
router.post("/collaborators/:dashboardId", protectRoute, addCollaborator);
router.delete("/delete/:dashboardId", protectRoute, deleteDashboard);
router.delete("/collaborators/:dashboardId", protectRoute, deleteCollaborator);
router.put("/:dashboardId", protectRoute, updateDashboard);

export default router;