import React from 'react';
import notFound from '../../public/lottie/404.json'
import Lottie from 'lottie-react';
import { Link } from 'react-router';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const Error = () => {
    return (
        <div>
            <Navbar/>
            <div className='flex flex-col justify-center items-center min-h-screen bg-white text-secondary-content'>
            <Lottie animationData={notFound} loop={true} style={{
                maxWidth : '520px'
            }}/>
             <Link to='/' className='btn bg-linear-to-r from-primary to-orange-500 border-0 text-white hover:scale-101 transition-all duration-300'>Go Back Home</Link>
        </div>
        <Footer/>
        </div>
    );
};

export default Error;