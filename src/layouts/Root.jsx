import React from 'react';
import Navbar from '../components/sharedComponents/header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/sharedComponents/Footer';

const Root = () => {
    console.log("this is from root")
    return (
        <div className='bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]'>
            <Navbar />
            <div className='min-h-[60vh]'>
            <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;