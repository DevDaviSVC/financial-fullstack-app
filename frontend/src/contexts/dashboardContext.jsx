import { createContext, useContext, useEffect, useState } from "react";

export const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardContextProvider = ({children}) => {
    const [dashboard, setDashboard] = useState(null);

    return (
        <DashboardContext.Provider value={{dashboard, setDashboard}}>
            {children}
        </DashboardContext.Provider>
    )
};