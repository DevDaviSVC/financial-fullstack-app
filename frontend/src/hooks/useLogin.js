import { useState } from "react";
import { useAuthContext } from "../contexts/authContext"
import toast from "react-hot-toast";

export const useLogin = () => {
    const {setAuthUser} = useAuthContext();
    const [loading, setLoading] = useState(false);

    const login = async (loggingUser) => {
        setLoading(true);

        try {

            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loggingUser)
            });
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            toast.success(data.message);
            setAuthUser(data.user);

        } catch (error) {
            console.error(error.message)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { login, loading };
}