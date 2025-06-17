import React from 'react';
import Banner from './Banner';
import NearlyExpireItem from '../nearlyExpire/NearlyExpireItem';

const Home = () => {
    return (
        <div>
            <Banner/>
            <NearlyExpireItem/>
        </div>
    );
};

export default Home;