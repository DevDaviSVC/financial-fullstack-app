import React, { useEffect } from 'react';
import { FaDollarSign } from "react-icons/fa";
import { LiaMoneyCheckSolid } from "react-icons/lia";
import { MdAccountBalance } from "react-icons/md";
import CollaboratorCollapse from '../../components/dashboard/CollaboratorCollapse';
import Item from '../../components/dashboard/Item';
import { useDashboardContext } from '../../contexts/dashboardContext';
import { useNavigate } from "react-router-dom";
import AddItemForm from '../../components/dashboard/AddItemForm';
import formatDashboardInfo from '../../utils/formatDashboardInfo';

export default function Dashboard() {
    const { dashboard } = useDashboardContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!dashboard) navigate("/");
    });

    const {profit, debit, balance} = formatDashboardInfo();

    return (
        <>
            {dashboard && (
                <div className='pt-32'>
                <h1 className='text-5xl font-semibold mb-8'>Dashboard - {dashboard.name}</h1>
                <div className='p-8 bg-blue-900 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 shadow flex flex-wrap flex-col gap-8'>
                    <div className="w-full flex gap-8">
                        <div className="rounded-md text-xl p-4 bg-green-500 w-full bg-opacity-50 flex gap-4 items-center">
                            <MdAccountBalance /> 
                            <p>{balance}</p>
                        </div>
                        <div className="rounded-md text-xl p-4 bg-green-800 w-full bg-opacity-50 flex gap-4 items-center">
                            <FaDollarSign /> 
                            <p>{profit}</p>
                        </div>
                        <div className="rounded-md text-xl p-4 bg-red-700 w-full bg-opacity-50 flex gap-4 items-center">
                            <LiaMoneyCheckSolid /> 
                            <p>{debit}</p>
                        </div>
                    </div>
                    <div className="w-full max-h-[400px] overflow-y-auto">
                        {dashboard.items.length > 0 ?
                            dashboard.items.map((item) => (
                                <Item item={item} key={item.id}/>
                            )) : (
                                <div className='text-xl font-semibold text-center p-4'>
                                    <p>You don't have any items on this dashboard</p>
                                </div>
                            )
                        }
                    </div>
                    <AddItemForm />
                    <div className='w-full flex gap-8 items-start'>
                        <div className='collapse bg-slate-700 rounded-md w-[50%] bg-opacity-50'>
                            <input type="checkbox" />
                            <div className='collapse-title text-xl font-medium'>Collaborators</div>
                            <div className="collapse-content">
                                {dashboard.collaborators.map((collaborator) => (
                                    <CollaboratorCollapse collaborator={collaborator} key={collaborator._id}/>
                                ))}
                            </div>
                        </div>
                        <div className='collapse bg-slate-700 rounded-md w-[50%] bg-opacity-50'>
                            <input type="checkbox" />
                            <div className='collapse-title text-xl font-medium'>Admins</div>
                            <div className="collapse-content">
                                {dashboard.admins.map((admin) => (
                                    <CollaboratorCollapse collaborator={admin} key={admin._id}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}