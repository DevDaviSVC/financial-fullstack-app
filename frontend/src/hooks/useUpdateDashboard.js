import React, { useState } from 'react'
import { useAuthContext } from '../contexts/authContext';
import toast from 'react-hot-toast';

export default function useUpdatDashboard() {
    const [loading, setLoading] = useState(false);
    const {authUser} = useAuthContext();

    const updateDashboard = async (dashboard) => {
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:5000/api/dashboard/${authUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({dashboardId: dashboard._id, items: dashboard.items})
            });
            const data = await response.json();

            if (data.error) throw new Error(data.error);

            toast.success(data.message);

        } catch (error) {
            console.error(error.message);
            toast.error(error.message);

        } finally {
            setLoading(false);
        }
    }


    return {updateDashboard, loading}
}
