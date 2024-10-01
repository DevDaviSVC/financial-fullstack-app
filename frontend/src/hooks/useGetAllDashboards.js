import { useEffect, useState } from "react"
import toast from "react-hot-toast";

export const useGetAllDashboards = () => {
    const [loading, setLoading] = useState(false);
    const [allDashboards, setAllDashboards] = useState([]);

    useEffect(() => {
        const getAllDashboards = async () => {
            setLoading(true);
    
            try {
    
                const response = await fetch(`/api/dashboard`);
                const data = await response.json();
    
                if (data.error) throw new Error(data.error);
            
                setAllDashboards(data);
    
            } catch (error) {
                console.error(error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getAllDashboards();
    }, []);

    return {loading, allDashboards};

}