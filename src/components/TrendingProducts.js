import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Container,
    IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const TopBadge = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#ff5722',
    color: 'white',
    padding: '4px 8px',
    borderRadius: theme.shape.borderRadius,
    fontWeight: 'bold',
    zIndex: 1,
}));

const products = [
    {
        id: 1,
        name: 'Phở Bò',
        price: 12,
        image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=400&q=80',
        sales: '150+ / tháng'
    },
    {
        id: 2,
        name: 'Bánh Mì',
        price: 8,
        image: 'https://images.unsplash.com/photo-1600454309261-3dc9b7597637?auto=format&fit=crop&w=400&q=80',
        sales: '180+ / tháng'
    },
    {
        id: 3,
        name: 'Cơm Tấm',
        price: 10,
        image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=400&q=80',
        sales: '130+ / tháng'
    },
    {
        id: 4,
        name: 'Bún Chả Hà Nội',
        price: 13,
        image: 'https://images.unsplash.com/photo-1501200291289-c5a76c232e5f?auto=format&fit=crop&w=400&q=80',
        sales: '165+ / tháng'
    },
    {
        id: 5,
        name: 'Gỏi Cuốn',
        price: 9,
        image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80',
        sales: '140+ / tháng'
    },
    {
        id: 6,
        name: 'Bún Bò Huế',
        price: 12,
        image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=400&q=80',
        sales: '110+ / tháng'
    }
];

export default function TrendingProducts() {
    const navigate = useNavigate();
    const scrollContainerRef = React.useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = 300;

            if (direction === 'next') {
                if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                    // If near the end, scroll to start
                    container.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    container.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                }
            } else {
                if (container.scrollLeft <= 10) {
                    // If near the start, scroll to end
                    container.scrollTo({
                        left: container.scrollWidth,
                        behavior: 'smooth'
                    });
                } else {
                    container.scrollBy({
                        left: -scrollAmount,
                        behavior: 'smooth'
                    });
                }
            }
        }
    };

    const handleViewAll = () => {
        navigate('/menu');
    };

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h2" sx={{ flexGrow: 1 }}>
                    MÓN ĂN PHỔ BIẾN
                </Typography>
                <Typography
                    variant="body2"
                    color="primary"
                    sx={{ cursor: 'pointer' }}
                    onClick={handleViewAll}
                >
                    Xem Tất Cả &gt;
                </Typography>
            </Box>

            <Box sx={{ position: 'relative' }}>
                <IconButton
                    onClick={() => scroll('prev')}
                    sx={{
                        position: 'absolute',
                        left: -20,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 2,
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        '&:hover': { bgcolor: 'background.paper' }
                    }}
                >
                    <NavigateBeforeIcon />
                </IconButton>

                <Box
                    ref={scrollContainerRef}
                    sx={{
                        display: 'flex',
                        gap: 2,
                        overflowX: 'auto',
                        scrollBehavior: 'smooth',
                        '&::-webkit-scrollbar': { display: 'none' },
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                        py: 1
                    }}
                >
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            sx={{
                                minWidth: 200,
                                position: 'relative',
                                cursor: 'pointer',
                                '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' }
                            }}
                        >
                            <TopBadge>TOP</TopBadge>
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.image}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="body1" component="div" noWrap>
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Bán {product.sales}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                <IconButton
                    onClick={() => scroll('next')}
                    sx={{
                        position: 'absolute',
                        right: -20,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 2,
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        '&:hover': { bgcolor: 'background.paper' }
                    }}
                >
                    <NavigateNextIcon />
                </IconButton>
            </Box>
        </Container>
    );
} 