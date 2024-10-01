import { useEffect, useState } from "react"
import { useAuthContext } from "../contexts/authContext";
import toast from "react-hot-toast";

export const useGetAllAdminDashboards = () => {
    const [loading, setLoading] = useState(false);
    const [allAdminDashboards, setAllAdminDashboards] = useState([]);

    useEffect(() => {
        const getAllAdminDashboards = async () => {
            setLoading(true);
            
            try {
    
                const response = await fetch(`/api/dashboard/admin`);
                const data = await response.json();
    
                if (data.error) throw new Error(data.error);
            
                setAllAdminDashboards(data);
    
            } catch (error) {
                console.error(error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getAllAdminDashboards();
    }, []);

    return {loading, allAdminDashboards};

}