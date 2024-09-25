import React, { useState } from 'react'
import useAddCollaborator from '../../hooks/useAddCollaborator';

export default function AddCollaboratorForm() {
  const [collaboratorUsername, setCollaboratorUsername] = useState("");
  const {addCollaborator, loading} = useAddCollaborator();

  const handleChange = (e) => {
    setCollaboratorUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCollaborator(collaboratorUsername);
  }

  return (
    <div className="bg-slate-500 bg-opacity-50 p-4 rounded-lg">
      <h3 className="mb-4 text-xl font-medium">Add a new Collaborator to the Dashboard</h3>
      <form className='flex items-end gap-4' onSubmit={handleSubmit}>
        <div className='w-full max-w-[400px]'>
          <label className="label label-text">Collaborator Username</label>
          <input 
              className="input input-sm w-full max-w-[400px]" 
              name="name"
              type="text"
              value={collaboratorUsername}
              onChange={handleChange}
          />
        </div>
        <button className='btn btn-sm btn-info' type='submit'>
          {loading ? <span className='loading loading-spin'></span> : "Add Collaborator"}
        </button>
      </form>
    </div>
  )
}