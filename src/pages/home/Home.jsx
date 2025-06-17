import React from 'react';
import Banner from './Banner';
import NearlyExpireItem from '../nearlyExpire/NearlyExpireItem';
import Expired from './expire/Expired'
import HowItWork from './HowItWork';
import FoodStats from './FoodStats';
import FAQ from './FQA';

const Home = () => {
    return (
        <div>
            <Banner/>
            <HowItWork/>
            <NearlyExpireItem/>
            <Expired/>
            <FoodStats/>
            <FAQ/>
        </div>
    );
};

export default Home;