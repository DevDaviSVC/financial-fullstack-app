import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function useUpdatDashboard() {
    const [loading, setLoading] = useState(false);

    const updateDashboard = async (dashboard) => {
        setLoading(true);

        try {
            const response = await fetch(`/api/dashboard/${dashboard._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ items: dashboard.items})
            });
            const data = await response.json();

            if (data.error) throw new Error(data.error);

            toast.success(data.message);
            return true;

        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
            return false;

        } finally {
            setLoading(false);
        }
    }


    return {updateDashboard, loading}
}
