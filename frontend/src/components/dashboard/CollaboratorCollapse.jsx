import React from 'react';
import { IoPersonRemoveSharp } from "react-icons/io5";
import { useDashboardContext } from '../../contexts/dashboardContext';
import { useAuthContext } from '../../contexts/authContext';
import useDeleteCollaborator from '../../hooks/useDeleteCollaborator';

export default function CollaboratorCollapse({collaborator}) {
  const {authUserIsAdmin} = useDashboardContext();
  const {authUser} = useAuthContext();
  const {deleteCollaborator} = useDeleteCollaborator();

  const showDelete = authUserIsAdmin && collaborator._id !== authUser._id;

  const handleClick = () => {
    let confirmAction = confirm(`Are you sure you want to remove ${collaborator.name} from the Dashboard?`);
    if (confirmAction) deleteCollaborator(collaborator.username);
  };

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
      {showDelete && <IoPersonRemoveSharp className='hover:text-red-400 transition-all' onClick={handleClick}/>}
    </div>
  )
}