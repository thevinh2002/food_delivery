import React from 'react';
import FoodCard from './Foodcard';
import { Box } from '@mui/material';

const foods = [
  {
    id: 1,
    name: 'Phở Bò',
    description: 'Phở bò truyền thống với nước dùng đậm đà',
    price: 12,
    img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=400&q=80',
    sold: 150,
  },
  {
    id: 2, 
    name: 'Bánh Mì',
    description: 'Bánh mì giòn với thịt và rau tươi',
    price: 8,
    img: 'https://images.unsplash.com/photo-1600454309261-3dc9b7597637?auto=format&fit=crop&w=400&q=80', 
    sold: 180,
  },
  {
    id: 3,
    name: 'Cơm Tấm',
    description: 'Cơm tấm sườn nướng với đồ chua',
    price: 10,
    img: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=400&q=80',
    sold: 130,
  },
  {
    id: 4,
    name: 'Bún Chả Hà Nội',
    description: 'Bún chả thịt nướng thơm ngon, kèm nước chấm đặc biệt và rau sống',
    price: 13,
    img: 'https://images.unsplash.com/photo-1501200291289-c5a76c232e5f?auto=format&fit=crop&w=400&q=80',
    sold: 165,
  },
  {
    id: 5,
    name: 'Gỏi Cuốn',
    description: 'Gỏi cuốn tôm thịt với nước chấm',
    price: 9,
    img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80',
    sold: 140,
  },
  {
    id: 6,
    name: 'Bún Bò Huế',
    description: 'Bún bò Huế cay nồng đặc trưng',
    price: 12,
    img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=400&q=80',
    sold: 110,
  },
  {
    id: 7,
    name: 'Bánh Xèo',
    description: 'Bánh xèo giòn với tôm thịt và rau sống',
    price: 10,
    img: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=400&q=80',
    sold: 95,
  },
  {
    id: 8,
    name: 'Cà Phê Sữa Đá',
    description: 'Cà phê đen đậm đà với sữa đặc',
    price: 5,
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
    sold: 200,
  },
  {
    id: 9,
    name: 'Chè Thái',
    description: 'Chè Thái với nhiều loại topping',
    price: 6,
    img: 'https://images.unsplash.com/photo-1579208030886-b937da0925dc?auto=format&fit=crop&w=400&q=80',
    sold: 85,
  },
  {
    id: 10,
    name: 'Trà Sữa Trân Châu',
    description: 'Trà sữa với trân châu đường đen',
    price: 7,
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80',
    sold: 160,
  },
];

export { foods };

export default function Foodlist({ page = 1, itemsPerPage = 6 }) {
  // Calculate start and end index for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  // Get foods for current page
  const currentFoods = foods.slice(startIndex, endIndex);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 3,
        padding: 3,
      }}
    >
      {currentFoods.map(food => (
        <FoodCard key={food.id} {...food} />
      ))}
    </Box>
  );
}
