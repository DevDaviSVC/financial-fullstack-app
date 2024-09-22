import React from 'react';
import { IoPersonRemoveSharp } from "react-icons/io5";

export default function CollaboratorCollapse({collaborator}) {

  return (
    <div className='flex items-center justify-between p-4'>
      <div className='flex gap-4 items-center'>
        <div className="avatar">
            <div className="w-10 rounded-full">
                <img src={collaborator.profilePic} />
            </div>
        </div>
        <p>{collaborator.name}</p>
      </div>
      <IoPersonRemoveSharp className='hover:text-red-400 transition-all' />
    </div>
  )
}