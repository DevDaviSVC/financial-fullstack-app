import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/authContext.jsx';
import DashboardList from '../components/home/DashboardList.jsx';
import { FiPlus } from "react-icons/fi";
import CreateDashboardForm from '../components/dashboard/CreateDashboardForm.jsx';
import { useGetAllDashboards } from '../hooks/useGetAllDashboards.js';
import { useGetAllAdminDashboards } from "../hooks/useGetAllAdminDashboards.js";

export default function Home() {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const userFN = authUser?.name.split(" ")[0];

  useEffect(() => {
    if (!authUser) navigate("/login");
  }, [authUser]);

  const [showModal, setShowModal] = useState(false);

  const { loading:loadingAll , allDashboards } = useGetAllDashboards();
  const { loading:loadingAdmin, allAdminDashboards } = useGetAllAdminDashboards();

  if (authUser) {
    return (
      <div className='p-6'>
        <div className="hero min-h-[100vh]">
  
          {!showModal ? (
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className='text-5xl font-bold'> Hello {userFN}! 👋</h1>
                <p className='py-8 text-xl'>What are you thinking today?</p>
                <button className='btn btn-lg btn-success' onClick={() => setShowModal(true)}>
                  Create new Dashboard <FiPlus />
                </button>
              </div>
            </div>
          ) : (
             <CreateDashboardForm setShowModal={setShowModal} />
          )}
  
        </div>
        <div>
          <DashboardList adminList={true} dashboards={allAdminDashboards} loading={loadingAdmin} />
          <DashboardList adminList={false} dashboards={allDashboards} loading={loadingAll} />
        </div>
      </div>
    )
  } else {
    return (<div></div>)
  }
 
}