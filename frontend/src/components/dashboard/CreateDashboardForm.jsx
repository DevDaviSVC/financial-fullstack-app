import React, { useState } from 'react'
import { useCreateDashboard } from '../../hooks/useCreateDashboard';

export default function CreateDashboardForm({setShowModal}) {
    const [dashboardName, setDashboardName] = useState("");
    const {loading, createDashboard} = useCreateDashboard();

    const handleSubmit = (e) => {
        e.preventDefault();
        createDashboard(dashboardName);
    };

    const handleInputChange = (e) => {
        setDashboardName(e.target.value);
    };

  return (
    <div>
    <h1 className='text-5xl font-semibold text-center'>Create new Dashboard</h1>
    <form className='bg-gray-950 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50 p-8 max-w-[400px] mx-auto my-10 text-start shadow-xl' onSubmit={handleSubmit}>
      <div className='w-full pb-4'>
        <label className='label-text px-2 text-white'>Dashboard Name</label>
        <input
          type="text"
          name='username'
          placeholder="Dashboard Name"
          className='input input-bordered w-full'
          value={dashboardName}
          onChange={handleInputChange}
        />
      </div>
      <div className='pt-4'>
        <button type="submit" className='btn btn-md w-full bg-green-900 hover:bg-green-950 transition-bg mb-4'>
          Create Dashboard
        </button>
        <button className='btn btn-md w-full bg-red-900 hover:bg-red-950 transition-bg' onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </div>
    </form>
  </div>
  )
}