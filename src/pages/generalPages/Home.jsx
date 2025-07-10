import React from 'react';
import Banner from '../../components/general/Banner';
import Overview from '../../components/general/Overview';
import TabsSection from '../../components/general/TabSection';
import TouristStoryComponent from '../../components/general/TouristStoryComponent';
import TopDestinations from '../../components/general/TopDestinations';
import ReviewSection from '../../components/general/ReviewSection';

const Home = () => {
    return (
        <div>
            <Banner />
            <Overview />
            {/* tourism and travel guide section */}
            <TabsSection />
            {/* tourist story section */}
            <TouristStoryComponent />
            {/* Top tourist destination */}
            <TopDestinations />
            {/* reviews and testimonials */}
            <ReviewSection />
        </div>
    );
};

export default Home;