import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    Button,
    Chip,
    Divider,
    IconButton
} from '@mui/material';
import { LocalDining, ShoppingCart, Favorite, ArrowBack } from '@mui/icons-material';

// Import the foods data
import { foods } from '../components/Foodlist';

export default function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = foods.find(food => food.id === parseInt(id));

    if (!product) {
        return (
            <Container>
                <Typography variant="h5" color="error" sx={{ mt: 4 }}>
                    Không tìm thấy sản phẩm
                </Typography>
            </Container>
        );
    }

    return (
        <>
            <Header />
                <Box sx={{ mb: 2 }}>
                    <IconButton 
                        onClick={() => navigate(-1)}
                        sx={{ 
                            '&:hover': { backgroundColor: 'action.hover' }
                        }}
                    >
                        <ArrowBack />
                    </IconButton>
                </Box>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                <Grid container spacing={4}>
                    {/* Product Image */}
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={product.img}
                            alt={product.name}
                            sx={{
                                width: '100%',
                                height: 400,
                                objectFit: 'cover',
                                borderRadius: 2,
                            }}
                        />
                    </Grid>

                    {/* Product Details */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {product.name}
                        </Typography>

                        <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                            ${product.price}
                        </Typography>

                        <Box sx={{ my: 2 }}>
                            <Chip
                                icon={<LocalDining />}
                                label={`Đã bán: ${product.sold}`}
                                color="primary"
                                variant="outlined"
                            />
                        </Box>

                        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                            {product.description}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="contained"
                                startIcon={<ShoppingCart />}
                                size="large"
                                sx={{ flex: 2 }}
                            >
                                Thêm vào giỏ hàng
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<Favorite />}
                                size="large"
                                sx={{ flex: 1 }}
                            >
                                Yêu thích
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
        </>
    );
}
