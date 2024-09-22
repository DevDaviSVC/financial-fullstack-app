import React from 'react'
import { useSwitchDashboard } from '../../hooks/useSwitchDashboard'
import { useNavigate } from 'react-router-dom';

export default function DashboardItem({dashboard}) {
    const { switchDashboard } = useSwitchDashboard();
    const navigate = useNavigate();

    const handleClick = async () => {
        await switchDashboard(dashboard._id);
        navigate("/dashboard");
    }

    return (
        <div className='w-full p-4 rounded hover:bg-slate-700 transition-all hover:scale-[1.01] border border-gray-500 mb-4' onClick={handleClick}>
            {dashboard.name}
        </div>
    )
}