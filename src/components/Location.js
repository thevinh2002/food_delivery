import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContactInfo = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginBottom: theme.spacing(3),
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderRadius: theme.spacing(1),
}));

const MapContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '550px',
    height: '600px',
    border: 'none',
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
        margin: '0',
    }
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    color: '#666',
    marginBottom: theme.spacing(4),
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        bottom: '-8px',
        left: 0,
        width: '60px',
        height: '3px',
        backgroundColor: '#4CAF50',
    }
}));

const Location = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={5}>
                    <StyledTitle variant="h4" component="h2">
                        THÔNG TIN LIÊN HỆ
                    </StyledTitle>
                    
                    <ContactInfo elevation={1}>
                        <Typography variant="h3" component="h1" 
                            sx={{ 
                                color: '#666',
                                mb: 4,
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                fontWeight: 'bold',
                                lineHeight: 1.2
                            }}>
                            Đặt món ăn ngay!
                        </Typography>

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem' }}>
                                <strong>Hotline đặt món:</strong> 0915.659.223
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem' }}>
                                <strong>Email đặt món:</strong> contact@fooddelivery.com
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem' }}>
                                <strong>Địa chỉ nhà hàng:</strong> 123 Food Street, Cuisine City, FC 12345
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem' }}>
                                <strong>Thanh toán qua:</strong>
                            </Typography>
                            <Typography variant="body1" sx={{ ml: 2, mb: 1 }}>
                                Ngân hàng Vietcombank CN Cần Thơ
                            </Typography>
                            <Typography variant="body1" sx={{ ml: 2, mb: 1 }}>
                                STK: 0111000179239
                            </Typography>
                            <Typography variant="body1" sx={{ ml: 2 }}>
                                Chủ tài khoản: Nhà Hàng Món Ngon
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h6" sx={{ mb: 3, color: '#666', fontWeight: 'bold' }}>
                                CHÍNH SÁCH ĐẶT MÓN
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Typography variant="body1" sx={{ mb: 2 }}>Chính sách giao hàng</Typography>
                                    <Typography variant="body1" sx={{ mb: 2 }}>Cam kết chất lượng</Typography>
                                    <Typography variant="body1">Phương thức thanh toán</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" sx={{ mb: 2 }}>Phí vận chuyển</Typography>
                                    <Typography variant="body1" sx={{ mb: 2 }}>Chính sách hoàn tiền</Typography>
                                    <Typography variant="body1">Hướng dẫn đặt món</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </ContactInfo>
                </Grid>
                
                <Grid item xs={12} md={7} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <MapContainer sx={{ height: '600px', width:'550px' }}>
                        <iframe
                            title="Địa chỉ nhà hàng trên bản đồ"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841454377098!2d105.77573661474255!3d10.029933892830625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zMTMwIFjDtCBWaeG6v3QgTmdo4buHIFTEqW5oLCBBbiBI4buZaSwgTmluaCBLaeG7gXUsIEPhuqduIFRoxqEsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1645784547010!5m2!1svi!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        />
                    </MapContainer>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Location;
