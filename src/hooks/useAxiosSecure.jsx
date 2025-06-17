import React from 'react';
import axios from 'axios';
import useAuth from './useAuth';
const axiosInstance = axios.create({
    baseURL : 'https://food-expiry-tracker-server-three.vercel.app'
})

const useAxiosSecure = () => {
    const {user , logOut} = useAuth()
    // console.log(user?.accessToken)
    axiosInstance.interceptors.request.use(config =>{
        config.headers.authorization = `Bearer ${user?.accessToken}`
        return config
    })
    //response
    axiosInstance.interceptors.response.use(response => {
        return response
    },
    error =>{
        if(error.status === 401 || error.status === 403){
            logOut().then(() => 
                console.log('signOut user')
        ).catch(err =>
             console.log(err)
            )
        }
        console.log('error' , error)
        return Promise.reject(error)
    }
)
    return axiosInstance;
};

export default useAxiosSecure;