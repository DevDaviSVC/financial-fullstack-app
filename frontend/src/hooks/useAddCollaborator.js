import { useState } from 'react';
import toast from "react-hot-toast";
import { useDashboardContext } from '../contexts/dashboardContext';
import { useAuthContext } from '../contexts/authContext';

export default function useAddCollaborator() {
    const [loading, setLoading] = useState(false);
    const {dashboard, setDashboard} = useDashboardContext();
    const {authUser} = useAuthContext();


    const addCollaborator = async (newCollaboratorUsername) => {
        setLoading(true);

        try {
            
            const response = await fetch(`http://localhost:5000/api/dashboard/collaborators/${dashboard._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    adminId: authUser._id,
                    newCollaboratorUsername
                })
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);

            setDashboard(data.updatedDashboard);
            toast.success(data.message);

        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {addCollaborator, loading};
}