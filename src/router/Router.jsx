import { createBrowserRouter } from "react-router";
import Home from "../pages/home/Home";
import RootLayout from "../layout/RootLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddFood from "../pages/AddFood";
import Fridge from "../pages/Fridge";
import MyItems from "../pages/MyItems";

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