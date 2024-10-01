import { useState } from "react"
import { useAuthContext } from "../contexts/authContext";
import toast from "react-hot-toast";

export default function useLogout() {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const logout = async () => {
        setLoading(true);

        try {
            
            const response = await fetch("/api/auth/logout", {
                method: "POST"
            });
            const data = await response.json();

            if (data.error) throw new Error(data.error);

            setAuthUser(null);

            toast.success(data.message);

        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }


    return {loading, logout};
}