import React, { Suspense } from 'react';
import MyItemList from '../shared/MyItemList';
import useAuth from '../hooks/useAuth';
import useFoodApi from '../api/useFoodApi';
import Loading from '../shared/Loading';

const MyItems = () => {
    const {user} = useAuth()
    const {AddPromiseFood} = useFoodApi()
    // console.log(user.accessToken)
    return (
        <div>
           <Suspense fallback = {<Loading/>}>
             <MyItemList AddPromiseFood={AddPromiseFood(user?.email)}/>
           </Suspense>
        </div>
    );
};

export default MyItems;