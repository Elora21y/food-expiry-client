import { createBrowserRouter } from "react-router";
import Home from "../pages/home/Home";
import RootLayout from "../layout/RootLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddFood from "../pages/AddFood";
import Fridge from "../pages/fridge/Fridge";
import MyItems from "../pages/MyItems";
import AuthLayout from "../layout/AuthLayout";
import Loading from "../shared/Loading";
import Error from "../pages/Error";
import PrivateRoute from "./PrivateRoute";
import FoodDetails from "../pages/FoodDetails";

export const router = createBrowserRouter([
    {
        path : '/',
        Component : RootLayout,
        errorElement : <Error/>,
        hydrateFallbackElement:<Loading/>,
        children : [
            {
                index : true,
                Component : Home,
                loader :()=>fetch('http://localhost:2100/foods')
            },
            {
                path : '/fridge',
                Component : Fridge,
                loader : ()=>fetch('http://localhost:2100/foods')
            },
            {
                path : '/food-details/:id',
                Component : FoodDetails,
                // loader : ()=>fetch('http://localhost:2100/foods/')
            },
            {
                path : '/add-food',
                element: <PrivateRoute><AddFood></AddFood></PrivateRoute>
            },
            {
                path : '/my-items',
                element : <PrivateRoute> <MyItems></MyItems></PrivateRoute>
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