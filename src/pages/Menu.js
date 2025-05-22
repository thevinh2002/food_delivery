import React from 'react';
import FoodList from '../components/Foodlist';
import { Typography, Box } from '@mui/material';

export default function Menu() {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Our Menu
            </Typography>
            <FoodList />
        </Box>
    );
}
