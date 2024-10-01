import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuthContext } from "./authContext";

export const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardContextProvider = ({children}) => {
    const [dashboard, setDashboard] = useState(null);
    const {authUser} = useAuthContext();
    const [authUserIsAdmin, setAuthUserIsAdmin] = useState(dashboard?.admins.find(admin => admin === authUser?._id) ? true : false);

    useEffect(() => {
        if (dashboard) {
            setAuthUserIsAdmin(dashboard.admins.find(admin => admin._id === authUser._id) ? true : false)
        } else {
            setAuthUserIsAdmin(false);
        }
    }, [dashboard]);

    return (
        <DashboardContext.Provider value={{dashboard, setDashboard, authUserIsAdmin}}>
            {children}
        </DashboardContext.Provider>
    )
};