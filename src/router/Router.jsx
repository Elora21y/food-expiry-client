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
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService/TermsOfService";
import Recipes from "../pages/recipes/Recipes";
import RecipesDetails from "../pages/recipes/RecipesDetails";

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
                // loader :()=>fetch('https://food-expiry-tracker-server-three.vercel.app/foods')
                loader :()=>fetch(`${import.meta.env.VITE_base_url}/foods`)
            },
            {
                path : '/fridge',
                Component : Fridge,
                loader :()=>fetch(`${import.meta.env.VITE_base_url}/foods`)
            },
            {
                path : '/food-details/:id',
                Component : FoodDetails,
                loader : ({params})=>fetch(`${import.meta.env.VITE_base_url}/foods/${params.id}`)
                // loader : ({params})=>fetch(`https://food-expiry-tracker-server-three.vercel.app/foods/${params.id}`)
            },
            {
                path : '/recipes/:id',
                Component : RecipesDetails,
                // loader : ({params})=>fetch(`https://food-expiry-tracker-server-three.vercel.app/recipes/${params.id}`)
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
            },
            {
                path : '/recipes',
                 Component : Recipes
            },
            {
                path : '/privacy-policy',
                 Component : PrivacyPolicy
            },
            {
                path : '/terms-service',
                 Component : TermsOfService
            },
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