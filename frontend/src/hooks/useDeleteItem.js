import { useEffect, useRef } from 'react'
import { useDashboardContext } from '../contexts/dashboardContext';
import toast from 'react-hot-toast';
import useUpdateDashboard from './useUpdateDashboard';

export default function useDeleteItem() {
    const {dashboard, setDashboard} = useDashboardContext();
    const {updateDashboard} = useUpdateDashboard();
    const isDeletingItem = useRef(false);

    const deleteItem = async (itemId) => {
        try {
            
            const itemExists = dashboard.items.find(item => item.id === itemId);

            if (!itemExists) throw new Error("Item does not exist!");

            isDeletingItem.current = true;

            setDashboard(currentState => {
                let newItemsArr = currentState.items.filter((item) => item.id !== itemId);
                let newDashboard = {...currentState, items: newItemsArr};
                updateDashboard(newDashboard);
                return newDashboard;
            });

        } catch (error) {
            isDeletingItem.current = false;
            toast.error(error.message);   
        }
    }

    return {deleteItem};
}
