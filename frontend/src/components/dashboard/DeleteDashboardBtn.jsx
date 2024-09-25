import React from 'react'
import useDeleteDashboard from '../../hooks/useDeleteDashboard'
import { useDashboardContext } from '../../contexts/dashboardContext';

export default function DeleteDashboardBtn() {
    const {deleteDashboard, loading} = useDeleteDashboard();
    const {dashboard} = useDashboardContext();

    const handleClick = () => {
        const confirmDelete = confirm(`Are you sure you want do delete ${dashboard.name} dashboard? (This action cannot be undone)`);
        if (confirmDelete) deleteDashboard();
    }

    return (
        <button className='btn btn-error' onClick={handleClick}>
            {loading ? <span className='loading loading-spinner'></span> : "Delete Dashboard"}
        </button>
    )
}