import axios from 'axios';
import React from 'react';

const useFoodApi = () => {
    const AddPromiseFood = email =>{
return axios.get(`http://localhost:2100/foods?email=${email}`).then(res => res.data)
    }
    return{ 
        AddPromiseFood
    }
};

export default useFoodApi;