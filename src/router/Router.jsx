import { createBrowserRouter } from "react-router";
import Home from "../pages/home/Home";
import RootLayout from "../layout/RootLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddFood from "../pages/AddFood";
import Fridge from "../pages/Fridge";
import MyItems from "../pages/MyItems";
import AuthLayout from "../layout/AuthLayout";
import Loading from "../shared/Loading";
import Error from "../pages/Error";

export const router = createBrowserRouter([
    {
        path : '/',
        Component : RootLayout,
        errorElement : <Error/>,
        hydrateFallbackElement:<Loading/>,
        children : [
            {
                index : true,
                Component : Home
            },
            {
                path : '/fridge',
                Component : Fridge
            },
            {
                path : '/add-food',
                element: <AddFood></AddFood>
            },
            {
                path : '/my-items',
                element : <MyItems></MyItems>
            }
        ]
    },
    {
        path : '/auth',
        Component : AuthLayout,
        hydrateFallbackElement : <Loading/>,
        children : [
            {
                path : '/auth/login',
                Component : Login
            },
            {
                path : '/auth/register',
                Component : Register
            }
        ]
    },
    {
        path : '/*',
        Component : Error
    }
])