import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/authContext";

export const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async (signingUser) => {
        setLoading(true);

        try {
            
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signingUser)
            });
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            toast.success(data.message);
            setAuthUser(data.user);
            

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {loading, signup};
}