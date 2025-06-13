import { createBrowserRouter } from "react-router";
import Home from "../pages/home/Home";
import RootLayout from "../layout/RootLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
    {
        path : '/',
        Component : RootLayout,
        children : [
            {
                index : true,
                Component : Home
            },
            {
                path : '/login',
                Component : Login
            },
            {
                path : '/register',
                Component : Register
            }
        ]
    }
])