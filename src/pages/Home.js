import React from 'react';
import FoodList from '../components/Foodlist';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Home() {
    return (
        <div>
            <Header />
            <FoodList limit={3} />
            <Footer />
        </div>
    );
}
