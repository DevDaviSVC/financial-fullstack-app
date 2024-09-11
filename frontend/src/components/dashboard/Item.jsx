import React from 'react';
import { FaTrash } from "react-icons/fa";

export default function Item({item}) {


    return (
        <div className='flex justify-between p-4'>
            <div className='flex gap-4'>
                <h4>Item name</h4>
                <p className='text-green-400'>Credit</p>
            </div>
            <FaTrash className='hover:text-red-400 transition-all'/>
        </div>
    )
}