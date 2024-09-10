import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/authContext.jsx';

export default function Home() {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!authUser) navigate("/login");
  }, [authUser]);

  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className=''></h1>
          </div>
        </div>
      </div>
      <div className="bg-blue-950 p-4 rounded-xl bg-opacity-80">
        <h2 className='text-xl'>Dashboards who you are Admin</h2>
      </div>
    </div>
  )
}