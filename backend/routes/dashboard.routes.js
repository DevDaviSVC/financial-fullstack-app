import express from "express";
import { addCollaborator, createDashboard, deleteCollaborator, deleteDashboard, getAllAdminDashboards, getAllDashboards, getOneDashboard, updateDashboard } from "../controllers/dashboard.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/:userId", protectRoute, getAllDashboards);
router.get("/one/:userId/:dashboardId", protectRoute, getOneDashboard);
router.get("/admin/:userId", protectRoute, getAllAdminDashboards);
router.post("/create/:userId", protectRoute, createDashboard);
router.post("/collaborators/:dashboardId", protectRoute, addCollaborator);
router.delete("/delete/:dashboardId/:userId", protectRoute, deleteDashboard);
router.put("/collaborators/:dashboardId", protectRoute, deleteCollaborator);
router.put("/:userId", protectRoute, updateDashboard);

export default router;