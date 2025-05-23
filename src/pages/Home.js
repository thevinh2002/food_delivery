import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import Location from '../components/Location';
import TrendingProducts from '../components/TrendingProducts';

export default function Home() {
    return (
        <div>
            <Header />
            <Banner />
            <TrendingProducts />
            <Location />
            <Footer />
        </div>
    );
}
