import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import toast from "react-hot-toast";
import { useDashboardContext } from "../contexts/dashboardContext";

export const useSwitchDashboard = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const { setDashboard } = useDashboardContext();

    const switchDashboard = async (dashboardId) => {
        setLoading(true);

        try {
            
            const response = await fetch(`/api/dashboard/one/${authUser._id}/${dashboardId}`);
            const data = await response.json();

            if (data.error) throw new Error(data.error);

            setDashboard(data);

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    
    return {loading, switchDashboard};
}