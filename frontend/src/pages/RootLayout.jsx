import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuthContext } from '../contexts/authContext'

export default function RootLayout() {
  const { authUser } = useAuthContext();

  return (
    <div className='text-gray-50 min-h-screen'>
        <div className=" p-4 bg-transparent bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 fixed top-0 left-0 w-full z-40">
            <div className="container flex items-center justify-between">
                <Link to={"/"} className='btn btn-ghost text-xl'>Financial Dashboard App</Link>
                {authUser?.profilePic ? (
                     <div className="avatar">
                     <div className="w-10">
                       <img src={authUser.profilePic} alt="Profile Pic" />
                     </div>
                   </div>
                ) : ('')}
            </div>
        </div>
        <div className="container px-10 min-h-full">
            <Outlet />
        </div>
    </div>
  )
}