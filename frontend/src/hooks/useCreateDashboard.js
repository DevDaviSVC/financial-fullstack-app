import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSwitchDashboard } from "./useSwitchDashboard";

export const useCreateDashboard = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {switchDashboard} = useSwitchDashboard();

    const createDashboard = async (name) => {
        setLoading(true);

        try {
            const response = await fetch(`/api/dashboard/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name})
            });
            const data = await response.json();

            if (data.error) throw new Error(data.error);

            toast.success(data.message);
            console.log(data.dashboard);

            await switchDashboard(data.dashboard._id);

            navigate("/dashboard");
           

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, createDashboard};
};