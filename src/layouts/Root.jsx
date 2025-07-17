import React from 'react';
import Navbar from '../components/sharedComponents/header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/sharedComponents/Footer';

const Root = () => {
    return (
        <div className='bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]'>
            <Navbar />
            <div className='min-h-[60vh]'>
            <Outlet />
            </div>
            <Footer location="root"/>
        </div>
    );
};

export default Root;