import Dashboard from "../models/dashboard.model.js";
import User from "../models/user.model.js";
import verifyItemIntegrity from "../utils/verifyItemIntegrity.js";

export const createDashboard = async (req, res) => {
    try {
        const { _id:userId } = req.user;
        const { name } = req.body;

        const newDashboard = {
            name,
            collaborators: [userId],
            admins: [userId]
        };

        const dashboard = await Dashboard.create(newDashboard);

        res.status(200).json({message: `Dashboard ${name} successfully created!`, dashboard});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error."});
    }
};

export const deleteDashboard = async (req, res) => {
    try {
        const {_id:userId} = req.user;
        const { dashboardId } = req.params;

        const dashboard = await Dashboard.findOne({_id: dashboardId});
        if (!dashboard) return res.status(404).json({error: "Dashboard does not exist."});

        // verify if the user is the dashboard admin
        const isAdmin = await Dashboard.findOne({
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
        const {dashboardId} = req.params;
        const { items } = req.body;
        const { _id:userId } = req.user;

        // verify if the user is a dashboard's collaborator
        const isCollaborator = await Dashboard.findOne({
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
        const {newCollaboratorUsername} = req.body;
        const {_id:adminId} = req.user;

        // Verify if the adminId is listed on dashboard's admins list
        const admin = await Dashboard.findOne({
            _id: dashboardId,
            admins: {$elemMatch: {$eq: adminId}}
        });
        if (!admin) return res.status(401).json({error: "Unauthorized request: You are not an admin."});

        // verify if newCollaborator exists
        const newCollaborator = await User.findOne({username: newCollaboratorUsername});
        if (!newCollaborator) return res.status(404).json({error: "New collaborator does not exist."});

        // verify if newCollaborator is already a collaborator
        const isAlreadyACollaborator = await Dashboard.findOne({_id: dashboardId, collaborators: {$elemMatch: {$eq: newCollaborator._id}}});
        if (isAlreadyACollaborator) return res.status(401).json({error: `${newCollaboratorUsername} is already a collaborator.`});

        // update dashboard collaborators
        const dashboard = await Dashboard.findOne({_id: dashboardId});
        const newCollaboratorsArr = [...dashboard.collaborators, newCollaborator._id];
        const updatedDashboard = await Dashboard.findOneAndUpdate({_id: dashboardId}, {collaborators: newCollaboratorsArr}, {new: true}).populate("collaborators", 'name profilePic username').populate("admins", 'name profilePic username');
        res.status(200).json({message: `Collaborator ${newCollaborator.name} added successfully!`, updatedDashboard});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error."});
    }
};

export const deleteCollaborator = async (req, res) => {
    try {

        const {dashboardId} = req.params;
        const {collaboratorToRemoveUsername} = req.body;
        const {_id:adminId} = req.user;

        // Verify if the adminId is listed on dashboard's admins list
        const admin = await Dashboard.findOne({
            _id: dashboardId,
            admins: {$elemMatch: {$eq: adminId}}
        });
        if (!admin) return res.status(401).json({error: "Unauthorized request: You are not an admin."});

        // verify if collaborator exists
        const collaboratorToRemove = await User.findOne({username: collaboratorToRemoveUsername});
        if (!collaboratorToRemove) return res.status(404).json({error: "Collaborator to delete does not exist."});

        // update dashboard collaborators and admins
        const dashboard = await Dashboard.findOne({_id: dashboardId}).populate("collaborators", "username");
        const newCollaboratorsArr = dashboard.collaborators.filter(collaborator => !collaborator._id.equals(collaboratorToRemove._id));
        const newAdminsArr = dashboard.admins.filter(admin => !admin._id.equals(collaboratorToRemove._id));
        await Dashboard.findOneAndUpdate({_id: dashboardId}, {collaborators: newCollaboratorsArr, admins: newAdminsArr});

        res.status(200).json({message: `Collaborator ${collaboratorToRemove.name} removed successfully!`});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error."});
    }
};

export const getAllDashboards = async (req, res) => {
    try {
        
        const { _id:userId } = req.user;

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
        
        const { _id:userId } = req.user;

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
        const {_id:userId} = req.user;
        const { dashboardId } = req.params;

        // Verify if user exists
        const user = await User.findOne({_id: userId});
        if (!user) return res.status(404).json({error: "User does not exist!"});

        // Find dashboard
        const dashboard = await Dashboard.findOne({
            _id: dashboardId,
            collaborators: {$elemMatch: {$eq: userId}}
        }).populate("collaborators", 'name profilePic username').populate("admins", 'name profilePic username');
        if (!dashboard) return res.status(404).json({error: "Dashboard not found!"});

        res.status(200).json(dashboard);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error."});
    }
};