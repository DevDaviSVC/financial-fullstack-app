import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/authContext.jsx';
import DashboardList from '../components/home/dashboardList.jsx';
import { FiPlus } from "react-icons/fi";

export default function Home() {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const userFN = authUser?.name.split(" ")[0];

  useEffect(() => {
    if (!authUser) navigate("/login");
  }, [authUser]);

  const [showModal, setShowModal] = useState(false);

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
          <div className="hero min-h-100vh">
            <div>
            <h1 className='text-5xl font-semibold text-center'>Create new Dashboard</h1>
            <form className='bg-gray-950 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50 p-8 max-w-[400px] mx-auto my-10 text-start shadow-xl'  >
              <div className='w-full pb-4'>
                <label className='label-text px-2 text-white'>Dashboard Name</label>
                <input
                  type="text"
                  name='username'
                  placeholder="Dashboard Name"
                  className='input input-bordered w-full'
                />
              </div>
              <div className='pt-4'>
                <button type="submit" className='btn btn-md w-full bg-green-900 hover:bg-green-950 transition-bg mb-4'>
                  Create Dashboard
                </button>
                <button type="submit" className='btn btn-md w-full bg-red-900 hover:bg-red-950 transition-bg' onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
            </div>
          </div>
        )}
      </div>
      <div>
        <DashboardList adminList={true} />
        <DashboardList adminList={false} />
      </div>
    </div>
  )
}