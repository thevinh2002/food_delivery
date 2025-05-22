import React from 'react';
import FoodList from '../components/Foodlist';
import Header from '../components/Header';
import { Typography, Box } from '@mui/material';

export default function Menu() {
  return (
    <Box>
      <Header />
      <Typography variant="h4" gutterBottom>
        Our Menu
      </Typography>
      <FoodList />
    </Box>
  );
}
