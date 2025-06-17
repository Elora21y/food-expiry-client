import React from 'react';
import Banner from './Banner';
import NearlyExpireItem from '../nearlyExpire/NearlyExpireItem';
import Expired from './expire/Expired'

const Home = () => {
    return (
        <div>
            <Banner/>
            <NearlyExpireItem/>
            <Expired/>
        </div>
    );
};

export default Home;