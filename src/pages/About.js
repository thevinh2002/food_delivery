import React from 'react';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import Header from '../components/Header';

const About = () => {
    return (
        <>
            <Header />
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
                        About Us
                    </Typography>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" gutterBottom color="secondary">
                                Our Story
                            </Typography>
                            <Typography paragraph>
                                Welcome to our food delivery service! We started our journey in 2023 with a simple mission:
                                to connect people with their favorite restaurants and deliver delicious meals right to their doorstep.
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" gutterBottom color="secondary">
                                Our Mission
                            </Typography>
                            <Typography paragraph>
                                We strive to provide the best food delivery experience by partnering with top-quality restaurants
                                and ensuring fast, reliable delivery service to our valued customers.
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h5" gutterBottom color="secondary">
                                    Why Choose Us?
                                </Typography>
                                <Typography paragraph>
                                    • Wide selection of restaurants and cuisines<br />
                                    • Fast and reliable delivery<br />
                                    • Easy-to-use platform<br />
                                    • Excellent customer service<br />
                                    • Secure payment options
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    );
};

export default About;