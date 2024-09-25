import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/authContext";
import { useDashboardContext } from "../contexts/dashboardContext";

export default function useDeleteDashboard() {
  const [loading, setLoading] = useState(false);
  const {authUser} = useAuthContext();
  const {dashboard, setDashboard} = useDashboardContext();

  const deleteDashboard = async () => {
    setLoading(true);

    try {
      
      const response = await fetch(`http://localhost:5000/api/dashboard/delete/${dashboard._id}/${authUser._id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.error) throw new Error(daat.error);

      setDashboard(null);
      toast.success(data.message);


    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return {deleteDashboard, loading};
}