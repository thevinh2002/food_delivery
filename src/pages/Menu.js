import React, { useState } from 'react';
import FoodList from '../components/Foodlist';
import Header from '../components/Header';
import { Typography, Box, Pagination, Container } from '@mui/material';

export default function Menu() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Our Menu
        </Typography>
        <FoodList page={page} itemsPerPage={itemsPerPage} />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={Math.ceil(10 / itemsPerPage)} 
            page={page} 
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      </Container>
    </Box>
  );
}
