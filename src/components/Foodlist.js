import React from 'react';
import FoodCard from './Foodcard';
import { Box } from '@mui/material';

const foods = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic delight with 100% real mozzarella cheese',
    price: 12,
    img: 'https://images.unsplash.com/photo-1601924582975-88c30efbb417?auto=format&fit=crop&w=400&q=80',
    sold: 100,
  },
  {
    id: 2,
    name: 'Burger',
    description: 'Juicy grilled beef patty with fresh veggies',
    price: 10,
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
    sold: 120,
  },
  {
    id: 3,
    name: 'Sushi Platter',
    description: 'Fresh sushi with salmon, tuna and avocado',
    price: 20,
    img: 'https://images.unsplash.com/photo-1562967916-eb82221dfb30?auto=format&fit=crop&w=400&q=80',
    sold: 150,
  },
  {
    id: 4,
    name: 'Sushi Platter',
    description: 'Fresh sushi with salmon, tuna and avocado',
    price: 20,
    img: 'https://images.unsplash.com/photo-1562967916-eb82221dfb30?auto=format&fit=crop&w=400&q=80',
    sold: 90,
  },
  {
    id: 5,
    name: 'Sushi Platter',
    description: 'Fresh sushi with salmon, tuna and avocado',
    price: 20,
    img: 'https://images.unsplash.com/photo-1562967916-eb82221dfb30?auto=format&fit=crop&w=400&q=80',
    sold: 130,
  },
];
export default function Foodlist({ limit }) {
  const topFoods = [...foods]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, limit !== undefined ? limit : foods.length);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 3,
        padding: 3,
        flexWrap: 'wrap',
      }}
    >
      {topFoods.map(food => (
        <FoodCard key={food.id} {...food} />
      ))}
    </Box>
  );
}
