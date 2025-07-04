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
import About from "../pages/About";

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
                loader :()=>fetch('https://food-expiry-tracker-server-three.vercel.app/foods')
            },
            {
                path : '/fridge',
                Component : Fridge,
                loader : ()=>fetch('https://food-expiry-tracker-server-three.vercel.app/foods')
            },
            {
                path : '/food-details/:id',
                Component : FoodDetails,
                loader : ({params})=>fetch(`https://food-expiry-tracker-server-three.vercel.app/foods/${params.id}`)
            },
            {
                path : '/add-food',
                element: <PrivateRoute><AddFood></AddFood></PrivateRoute>
            },
            {
                path : '/my-items',
                element : <PrivateRoute> <MyItems></MyItems></PrivateRoute>
            },
            {
                path : '/about',
                 Component : About
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