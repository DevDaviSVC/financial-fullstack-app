import React, { useEffect } from 'react';
import { FaDollarSign } from "react-icons/fa";
import { LiaMoneyCheckSolid } from "react-icons/lia";
import CollaboratorCollapse from '../../components/dashboard/CollaboratorCollapse';
import Item from '../../components/dashboard/Item';
import { useDashboardContext } from '../../contexts/dashboardContext';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { dashboard } = useDashboardContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!dashboard) navigate("/");
    });

    return (
        <>
            {dashboard && (
                <div className='pt-32'>
                <h1 className='text-5xl font-semibold mb-8'>Dashboard - {dashboard.name}</h1>
                <div className='p-8 bg-blue-900 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 shadow flex flex-wrap flex-col gap-8'>
                    <div className="w-full flex gap-8">
                        <div className="rounded-md text-xl p-4 bg-green-700 w-full bg-opacity-50 flex gap-4 items-center">
                            <FaDollarSign /> <p>R$1000.00</p>
                        </div>
                        <div className="rounded-md text-xl p-4 bg-red-700 w-full bg-opacity-50 flex gap-4 items-center">
                            <LiaMoneyCheckSolid /> 
                            <p>R$200.00</p>
                        </div>
                    </div>
                    <div className="w-full max-h-[400px] overflow-y-auto">
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                    </div>
                    <div className='w-full flex gap-8 items-start'>
                        <div className='collapse bg-slate-700 rounded-md w-[50%] bg-opacity-50'>
                            <input type="checkbox" />
                            <div className='collapse-title text-xl font-medium'>Collaborators</div>
                            <div className="collapse-content">
                                <CollaboratorCollapse />
                                <CollaboratorCollapse />
                                <CollaboratorCollapse />
                                <CollaboratorCollapse />
                            </div>
                        </div>
                        <div className='collapse bg-slate-700 rounded-md w-[50%] bg-opacity-50'>
                            <input type="checkbox" />
                            <div className='collapse-title text-xl font-medium'>Admins</div>
                            <div className="collapse-content">
                                <CollaboratorCollapse />
                                <CollaboratorCollapse />
                                <CollaboratorCollapse />
                                <CollaboratorCollapse />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}