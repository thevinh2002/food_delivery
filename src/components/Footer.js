import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.dark',
        color: 'white',
        textAlign: 'center',
        py: 2,
        mt: 4,
      }}
    >
      <Typography variant="body2">
        © 2025 Food Delivery. All rights reserved.
      </Typography>
    </Box>
  );
}
