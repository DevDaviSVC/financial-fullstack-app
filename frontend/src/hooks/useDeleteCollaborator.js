import { useState } from "react"
import { useAuthContext } from "../contexts/authContext";
import toast from "react-hot-toast";
import { useDashboardContext } from "../contexts/dashboardContext";

export default function useDeleteCollaborator() {
    const [loading, setLoading] = useState(false);
    const {dashboard, setDashboard} = useDashboardContext();
    const {authUser} = useAuthContext();

    const deleteCollaborator = async (collaboratorToRemoveUsername) => {
        setLoading(true);

        try {
            
            const response = await fetch(`/api/dashboard/collaborators/${dashboard._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    adminId: authUser._id,
                    collaboratorToRemoveUsername
                })
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);

            setDashboard(currentState => {
                let newCollaboratorsArr = currentState.collaborators.filter(collaborator => collaborator.username !== collaboratorToRemoveUsername);
                let newAdminsArr = currentState.admins.filter(admin => admin.username !== collaboratorToRemoveUsername);
                return {...currentState, collaborators: newCollaboratorsArr, admins: newAdminsArr};
            });

            toast.success(data.message);

        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {deleteCollaborator, loading};
}