import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LocalDining, AccessTime } from '@mui/icons-material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const BannerWrapper = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    minHeight: '500px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url(https://source.unsplash.com/random/1600x900/?food,restaurant)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.2,
    }
}));

const FeatureBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    boxShadow: theme.shadows[2],
}));

const Banner = () => {
    return (
        <BannerWrapper>
            <Container maxWidth="lg">
                <Box sx={{ position: 'relative', py: 8 }}>
                    {/* Main Content */}
                    <Box sx={{ maxWidth: 600, color: 'white' }}>
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                mb: 3,
                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                            }}
                        >
                            Delicious Food
                            <br />
                            Delivered To You
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 4,
                                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                            }}
                        >
                            Choose from thousands of restaurants and get your favorite meals delivered to your doorstep
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                backgroundColor: '#fff',
                                color: '#FE6B8B',
                                '&:hover': {
                                    backgroundColor: '#f7f7f7',
                                }
                            }}
                        >
                            Order Now
                        </Button>
                    </Box>

                    {/* Features */}
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={3}
                        sx={{ mt: 6 }}
                    >
                        <FeatureBox>
                            <LocalDining sx={{ color: '#FE6B8B', fontSize: 40 }} />
                            <Box>
                                <Typography variant="h6" color="text.primary">
                                    Quality Food
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    From top-rated restaurants
                                </Typography>
                            </Box>
                        </FeatureBox>

                        <FeatureBox>
                            <LocalShippingIcon sx={{ color: '#FE6B8B', fontSize: 40 }} />
                            <Box>
                                <Typography variant="h6" color="text.primary">
                                    Fast Delivery
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    To your doorstep
                                </Typography>
                            </Box>
                        </FeatureBox>

                        <FeatureBox>
                            <AccessTime sx={{ color: '#FE6B8B', fontSize: 40 }} />
                            <Box>
                                <Typography variant="h6" color="text.primary">
                                    24/7 Service
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Order anytime
                                </Typography>
                            </Box>
                        </FeatureBox>
                    </Stack>
                </Box>
            </Container>
        </BannerWrapper>
    );
};

export default Banner;
