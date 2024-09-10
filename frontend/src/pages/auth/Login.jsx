import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/authContext';
import { useLogin } from '../../hooks/useLogin';

export default function Login() {
  const { authUser } = useAuthContext();
  const [loggingUser, setLoggingUser] = useState({
    username: "",
    password: ""
  });

  const { login, loading } = useLogin();
  
  const navigate = useNavigate();

  useEffect(() => {
      if (authUser) navigate("/");
  }, [authUser]);

  const handleInputChange = (e) => {
    setLoggingUser(state => ({...state, [e.target.name]: e.target.value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(loggingUser);
  }

  return (
    <div className='text-center'>
            <h1 className='text-5xl font-semibold'>Log into your account</h1>
        <form className='bg-gray-950 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50 p-8 max-w-[600px] mx-auto my-10 text-start shadow-xl'  onSubmit={handleSubmit}>
            <div className='w-full pb-4'>
                <label className='label-text px-2 text-white'>Username</label>
                <input 
                    type="text" 
                    name='username' 
                    placeholder="Username" 
                    className='input input-bordered w-full' 
                    onChange={handleInputChange}
                    value={loggingUser.username}
                />
            </div>

            <div className='w-full pb-4'>
                <label className='label-text px-2 text-white'>Password</label>
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    className='input input-bordered w-full' 
                    onChange={handleInputChange}
                    value={loggingUser.password}
                />
            </div>
            <Link to="/signup" className='hover:text-blue-400 hover:underline underline-offset-4 transition-all'>Don't have an account? Sign Up!</Link>
            <div className='pt-4'>
                <button type="submit" className='btn btn-md w-full hover:bg-blue-950 transition-bg'>
                    {loading ? <span className='loading loading-spinner'></span> : "Login"}
                </button>
            </div>
        </form>
    </div>
  )
}