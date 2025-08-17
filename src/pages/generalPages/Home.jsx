import React, { useContext } from 'react';
import Banner from '../../components/general/Banner';
import Overview from '../../components/general/Overview';
import TabsSection from '../../components/general/TabSection';
import TouristStoryComponent from '../../components/general/TouristStoryComponent';
import TopDestinations from '../../components/general/TopDestinations';
import ReviewSection from '../../components/general/ReviewSection';
import DestinationsMap from '../../components/general/DestinationsMap';
import AppAndNewsletterCTA from '../../components/general/AppAndNewsletterCTA';
import PartnersShowcase from '../../components/general/PartnersShowcase';
import { ContextValues } from '../../utility/contexts/ContextValue';
import Loading from '../../components/sharedComponents/Loading';

const Home = () => {
    const {loading} = useContext(ContextValues)

    if(loading) return <Loading />
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
            {/* destination map */}
            <DestinationsMap />
            {/* <AppAndNewsletterCTA /> */}
            {/* partners showcase */}
            <PartnersShowcase />
        </div>
    );
};

export default Home;