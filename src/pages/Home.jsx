import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import IntroSlider from '../container/IntroSlider/IntroSlider';
import ScrollToTop from '../components/ScrollToTop.jsx';
import TopHeader from '../components/smalltopheader/TopHeader';
import { getAndUpdateBookmarkData, isLogin } from '../utils';
const Home = () => {
    useEffect(() => {
        if (isLogin()) {
            getAndUpdateBookmarkData();
        }
    }, [])
    return (
        <React.Fragment>
            <SEO title="Home" />
            <TopHeader />
            <Header />
            <IntroSlider />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default Home;