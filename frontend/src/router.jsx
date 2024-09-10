import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";

const router = createBrowserRouter([{
    path: "/",
    element: <RootLayout />,
    children: [
        {
            index: true,
            element: <Home />
        },
        {
            path: "login",
            element: <Login />
        },
        {
            path: "signup",
            element: <Signup />
        }
    ]
}]);

export default router;