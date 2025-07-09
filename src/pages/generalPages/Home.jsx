import React from 'react';
import Banner from '../../components/general/Banner';
import Overview from '../../components/general/Overview';
import TabsSection from '../../components/general/TabSection';

const Home = () => {
    return (
        <div>
            <Banner />
            <Overview />
            {/* tourism and travel guide section */}
            <TabsSection />
        </div>
    );
};

export default Home;