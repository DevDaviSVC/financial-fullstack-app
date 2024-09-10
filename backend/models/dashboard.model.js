import mongoose from "mongoose";

const dashboardSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    admins: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    collaborators: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    items: [
        {
            type: Object
        }
    ]
}, {timestamps: true});

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

export default Dashboard;