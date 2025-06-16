import React, { Suspense } from 'react';
import MyItemList from '../shared/MyItemList';
import useAuth from '../hooks/useAuth';
import useFoodApi from '../api/useFoodApi';

const MyItems = () => {
    const {user} = useAuth()
    const {AddPromiseFood} = useFoodApi()
    return (
        <div>
           <Suspense>
             <MyItemList AddPromiseFood={AddPromiseFood(user.email)}/>
           </Suspense>
        </div>
    );
};

export default MyItems;