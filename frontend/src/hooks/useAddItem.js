import { useAuthContext } from "../contexts/authContext";
import toast from "react-hot-toast";
import { DashboardItem } from "../entities/dashboardItem";
import { useDashboardContext } from "../contexts/dashboardContext";
import useUpdateDashboard from "./useUpdateDashboard";

export default function useAddItem() {
    const {authUser} = useAuthContext();
    const {setDashboard} = useDashboardContext();
    const {updateDashboard, loading} = useUpdateDashboard();

    const addItem = (item) => {
        if (item.name.length < 3) {
            toast.error("Invalid name!");
            return;
        }

        let numValue;

        try {
            numValue = Number(item.value);
        } catch (error) {
            toast.error(error.message);
            return;
        }

        if (item.type !== "profit" && item.type !== "debit") {
            toast.error("Invalid item type!");
            return;
        }

        const itemObj = new DashboardItem(item.name, numValue, item.type, authUser._id);

        setDashboard(currentState => {
            let newItemsArr = currentState.items;
            newItemsArr.push(itemObj);
            updateDashboard({...currentState, items: newItemsArr});
            return {...currentState, items: newItemsArr};
        });

    }

    return {addItem, loading};
}