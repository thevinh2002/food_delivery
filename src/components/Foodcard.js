import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Zoom,
  IconButton,
} from '@mui/material';
import { useCart } from '../context/CartContext'; // Đường dẫn tùy dự án
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Foodcard({ id, name, description, price, img }) {
  const [open, setOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    addToCart({ id, name, price });
    setOpen(false);
  };

  const handleImageError = () => {
    console.error(`Failed to load image for ${name}`);
    setImageError(true);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  const handleOpenProductdetails = () => {
    navigate(`/product/${id}`);
  }

  return (
    <>
      <Zoom in={true} style={{ transitionDelay: '150ms' }}>
        <Card 
          sx={{ 
            maxWidth: 280,
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            transition: 'transform 0.3s ease-in-out',
            position: 'relative',
            cursor: 'pointer',
            '&:hover': {
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleOpenProductdetails}
        >
          <Box sx={{ position: 'relative' }}>
            <CardMedia 
              component="img" 
              height="180" 
              image={img} 
              alt={name}
              onError={handleImageError}
              sx={{
                objectFit: 'cover',
                backgroundColor: imageError ? '#f5f5f5' : 'transparent',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            />
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
              onClick={toggleFavorite}
            >
              <FavoriteIcon color={isFavorite ? 'error' : 'action'} />
            </IconButton>
          </Box>
          <CardContent>
            <Typography 
              gutterBottom 
              variant="h6" 
              component="div"
              sx={{
                fontWeight: 600,
                color: '#2c3e50'
              }}
            >
              {name}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                minHeight: 40,
                marginBottom: 1
              }}
            >
              {description}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: '#e74c3c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              ${price}
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={handleOpen}
                startIcon={<AddShoppingCartIcon />}
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  }
                }}
              >
                Add to Cart
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </Zoom>

      <Dialog 
        open={open} 
        onClose={handleClose}
        TransitionComponent={Zoom}
        PaperProps={{
          sx: {
            borderRadius: 2,
            padding: 1
          }
        }}
      >
        <DialogTitle sx={{ color: '#2c3e50', fontWeight: 600 }}>
          Confirm Order
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to order <strong>{name}</strong> for <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>${price}</span>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClose}
            sx={{ 
              color: '#7f8c8d',
              '&:hover': {
                backgroundColor: '#f5f6fa'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            variant="contained" 
            color="primary"
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }
            }}
          >
            Confirm Order
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
