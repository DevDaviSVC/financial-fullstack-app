import Dashboard from "../models/dashboard.model.js";
import User from "../models/user.model.js";
import verifyItemIntegrity from "../utils/verifyItemIntegrity.js";

export const createDashboard = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name } = req.body;

        const newDashboard = {
            name,
            collaborators: [userId],
            admins: [userId]
        };

        // verifies if the user exists
        const user = await User.findOne({_id: userId});
        if (!user) return res.status(401).json({error: "Unauthorized requisition: User does not exist."});

        const dashboard = await Dashboard.create(newDashboard);

        res.status(200).json({message: `Dashboard ${name} successfully created!`, dashboard});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error."});
    }
};

export const deleteDashboard = async (req, res) => {
    try {
        
        const { dashboardId, userId } = req.params;

        const dashboard = await Dashboard.findOne({_id: dashboardId});
        if (!dashboard) return res.status(404).json({error: "Dashboard does not exist."});

        // verify if the user is the dashboard admin
        const isAdmin = await Dashboard.find({
            _id: dashboardId,
            admins: {$elemMatch: {$eq: userId}}
        });
        if (!isAdmin) return res.status(401).json({error: "Unauthorized request: The user is not an Admin."});

        // delete the dashboard
        const deletedDashboard = await Dashboard.findOneAndDelete({_id: dashboardId});

        res.status(200).json({message: `Dashboard ${deletedDashboard.name} deleted successfully!`});


    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error."});
    }
};

export const updateDashboard = async (req, res) => {
    try {
        
        const { dashboardId, items } = req.body;
        const { userId } = req.params;

        // verify if the user is a dashboard's collaborator
        const isCollaborator = await Dashboard.find({
            _id: dashboardId,
            collaborators: { $elemMatch: { $eq: userId } }
        });
        if (!isCollaborator) return res.status(401).json({error: "Unauthorized request: The user is not a collaborator of the dashboard."});

        // verify items integrity
        let isComplete = true;
        items.forEach((item) => {
            if (!verifyItemIntegrity(item)) isComplete = false;
        });
        if (!isComplete) return res.status(400).json({error: "Items are not complete."});

        // Verify if the dashboard exist
        const dashboard = await Dashboard.findOneAndUpdate({_id: dashboardId}, {items});
        if (!dashboard) return res.status(404).json({error: "Dashboard does not exist."});

        res.status(200).json({message: `Dashboard ${dashboard.name} successfully updated!`});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error."});
    }
};

export const addCollaborator = async (req, res) => {
    try {

        const {dashboardId} = req.params;
        const {adminId, newCollaboratorUsername} = req.body;

        // Verify if the adminId is listed on dashboard's admins list
        const admin = await Dashboard.find({
            _id: dashboardId,
            admins: {$elemMatch: {$eq: adminId}}
        });
        if (!admin) return res.status(401).json({error: "Unauthorized request: You are not an admin."});

        // verify if newCollaborator exists
        const newCollaborator = await User.findOne({username: newCollaboratorUsername});
        if (!newCollaborator) return res.status(404).json({error: "New collaborator does not exist."});

        // update dashboard collaborators
        const dashboard = await Dashboard.findOne({_id: dashboardId});
        const newCollaboratorsArr = [...dashboard.collaborators, newCollaborator._id];
        await Dashboard.findOneAndUpdate({_id: dashboardId}, {collaborators: newCollaboratorsArr});

        res.status(200).json({message: `Collaborator ${newCollaborator.name} added successfully!`});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error."});
    }
};

export const deleteCollaborator = async (req, res) => {
    try {

        const {dashboardId} = req.params;
        const {adminId, collaboratorToRemoveUsername} = req.body;

        // Verify if the adminId is listed on dashboard's admins list
        const admin = await Dashboard.find({
            _id: dashboardId,
            admins: {$elemMatch: {$eq: adminId}}
        });
        if (!admin) return res.status(401).json({error: "Unauthorized request: You are not an admin."});

        // verify if newCollaborator exists
        const collaboratorToRemove = await User.findOne({username: collaboratorToRemoveUsername});
        if (!collaboratorToRemove) return res.status(404).json({error: "Collaborator to delete does not exist."});

        // update dashboard collaborators
        const dashboard = await Dashboard.findOne({_id: dashboardId}).populate("collaborators");
        const newCollaboratorsArr = dashboard.collaborators.filter(collaborator => !collaborator._id.equals(collaboratorToRemove._id));
        await Dashboard.findOneAndUpdate({_id: dashboardId}, {collaborators: newCollaboratorsArr});

        res.status(200).json({message: `Collaborator ${collaboratorToRemove.name} removed successfully!`});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error."});
    }
};

export const getAllDashboards = async (req, res) => {
    try {
        
        const { userId } = req.params;

        // Verify if user exists
        const user = await User.findOne({_id: userId});
        if (!user) return res.status(404).json({error: "User does not exist!"});

        // Getting user dashboards
        const dashboards = await Dashboard.find({ collaborators: { $elemMatch: { $eq: userId } } });
        res.status(200).json(dashboards);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error."});
    }
}

export const getAllAdminDashboards = async (req, res) => {
    try {
        
        const { userId } = req.params;

        // Verify if user exists
        const user = await User.findOne({_id: userId});
        if (!user) return res.status(404).json({error: "User does not exist!"});

        // Getting user dashboards
        const dashboards = await Dashboard.find({ admins: { $elemMatch: { $eq: userId } } });
        res.status(200).json(dashboards);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error."});
    }
}

export const getOneDashboard = async (req, res) => {
    try {
        const { userId, dashboardId } = req.params;

        // Verify if user exists
        const user = await User.findOne({_id: userId});
        if (!user) return res.status(404).json({error: "User does not exist!"});

        // Find dashboard
        const dashboard = await Dashboard.findOne({
            _id: dashboardId,
            collaborators: {$elemMatch: {$eq: userId}}
        }).populate("collaborators").populate("admins");
        if (!dashboard) return res.status(404).json({error: "Dashboard not found!"});

        res.status(200).json(dashboard);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error."});
    }
};