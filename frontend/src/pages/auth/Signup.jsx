import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/authContext'
import { useSignup } from '../../hooks/useSignup';

export default function Signup() {
    const { authUser } = useAuthContext();
    const [ signingUser, setSigningUser ] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    const {loading, signup} = useSignup();

    const handleInputChange = (e) => {
        setSigningUser(state => ({...state, [e.target.name]: e.target.value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(signingUser);
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (authUser) navigate("/");
    }, [authUser]);

  return (
    <div className='text-center pt-20 min-h-screen flex align-center flex-col justify-center'>
        <div>
            <h1 className='text-5xl font-semibold'>Create your account</h1>
            <form onSubmit={handleSubmit} className='bg-gray-950 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50 p-8 max-w-[400px] mx-auto my-10 text-start shadow-xl '>
                <div className='w-full pb-4'>
                    <label className='label-text px-2'>Name</label>
                    <input 
                        type="text" 
                        placeholder="John Doe" 
                        name='name'
                        className='input input-bordered w-full' 
                        value={signingUser.name}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='w-full pb-4'>
                    <label className='label-text px-2'>Username</label>
                    <input 
                        type="text" 
                        placeholder="johndoe" 
                        name='username'
                        className='input input-bordered w-full' 
                        value={signingUser.username}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='w-full pb-4'>
                    <label className='label-text px-2'>Password</label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name='password'
                        className='input input-bordered w-full' 
                        value={signingUser.password}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='w-full pb-6'>
                    <label className='label-text px-2'>Confirm Password</label>
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        name='confirmPassword'
                        className='input input-bordered w-full' 
                        value={signingUser.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>
                <Link to="/login" className='hover:text-blue-400 hover:underline underline-offset-4 transition-all'>Already have an account? Log in!</Link>
                <div className='pt-4'>
                    <button type="submit" className='btn btn-md w-full hover:bg-blue-950 transition-bg'>
                        {loading ? <span className='loading loading-spin'></span> : "Signup"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}