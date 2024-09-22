import React from 'react';
import { FaTrash } from "react-icons/fa";
import useDeleteItem from '../../hooks/useDeleteItem';

export default function Item({item}) {
    const typeColor = item.type === "profit" ? "text-green-400" : "text-red-400";
    const {deleteItem, loading} = useDeleteItem();

    const handleClick = async () => {
        await deleteItem(item.id);
    }

    return (
        <div className='flex justify-between p-4'>
            <div className='flex gap-4 items-center'>
                <h4 className='font-semibold text-xl'>{item.name}</h4>
                <p>R${item.value.toFixed(2)}</p>
            </div>
            <div className="flex gap-4 items-center">
                <p className={`${typeColor}`}>{item.type === "profit" ? "Credit" : "Debit"}</p>
                <span>
                    {loading ? <span className='loading loading-spin'></span> : <FaTrash className='hover:text-red-400 transition-all' onClick={handleClick}/>}
                </span>
            </div>
            
        </div>
    )
}