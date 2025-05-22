import React from 'react';
import FoodList from '../components/Foodlist';

export default function Home() {
    return (
        <div>
            <FoodList limit={3} />
        </div>
    );
}
