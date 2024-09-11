import React from 'react';
import { IoPersonRemoveSharp } from "react-icons/io5";

export default function CollaboratorCollapse({collaborator}) {
  return (
    <div className='flex items-center justify-between p-4'>
      <div className='flex gap-4 items-center'>
        <div className="avatar">
            <div className="w-10 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
        </div>
        <p>Collaborator 1</p>
      </div>
      <IoPersonRemoveSharp className='hover:text-red-400 transition-all' />
    </div>
  )
}