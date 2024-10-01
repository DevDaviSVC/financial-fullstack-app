import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuthContext } from '../contexts/authContext'
import useLogout from '../hooks/useLogout';

export default function RootLayout() {
  const { authUser } = useAuthContext();
  const {loading, logout} = useLogout();

  return (
    <div className='text-gray-50 min-h-screen'>
        <div className=" p-4 bg-transparent bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 fixed top-0 left-0 w-full z-40">
            <div className="container flex items-center justify-between">
                <Link to={"/"} className='btn btn-ghost text-xl'>Financial Dashboard App</Link>
                {authUser?.profilePic ? (
                     <div className="dropdown dropdown-end">
                     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                       <div className="w-10 rounded-full">
                         <img
                           alt="User profile pic"
                           src={authUser.profilePic} />
                       </div>
                     </div>
                     <ul
                       tabIndex={0}
                       className="menu menu-sm dropdown-content bg-base-100 rounded-lg z-[1] mt-3 w-52 p-2 shadow">
                       <li><a onClick={() => logout()}>{loading ? <span className='loading loading-spin'></span> : "Logout"}</a></li>
                     </ul>
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