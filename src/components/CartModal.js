import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartModal({ open, onClose }) {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleIncrease = (id, currentQty) => {
    updateQuantity(id, currentQty + 1);
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      updateQuantity(id, currentQty - 1);
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate('/pay');
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '50vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        py: 2
      }}>
        Your Cart
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 0 }}>
        {cartItems.length === 0 ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '200px'
          }}>
            <Typography variant="h6" color="text.secondary">
              Your cart is empty
            </Typography>
          </Box>
        ) : (
          <List sx={{ width: '100%' }}>
            {cartItems.map(({ id, name, price, quantity }) => (
              <React.Fragment key={id}>
                <ListItem
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: 2,
                    px: 3,
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                        {name}
                      </Typography>
                    }
                    secondary={`$${price.toFixed(2)} each`}
                    sx={{ flex: 1 }}
                  />

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    bgcolor: 'action.selected',
                    borderRadius: 1,
                    px: 1
                  }}>
                    <IconButton 
                      onClick={() => handleDecrease(id, quantity)} 
                      size="small" 
                      color="primary"
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ mx: 2, minWidth: '20px', textAlign: 'center' }}>
                      {quantity}
                    </Typography>
                    <IconButton 
                      onClick={() => handleIncrease(id, quantity)} 
                      size="small" 
                      color="primary"
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <IconButton 
                    edge="end" 
                    aria-label="delete" 
                    onClick={() => removeFromCart(id)}
                    sx={{ ml: 2 }}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </DialogContent>

      <DialogActions sx={{ 
        px: 3, 
        py: 2,
        bgcolor: 'grey.50',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'primary.main'
            }}
          >
            Total: ${totalPrice.toFixed(2)}
          </Typography>
          <Box>
            <Button 
              onClick={clearCart} 
              color="error" 
              disabled={cartItems.length === 0}
              sx={{ mr: 1 }}
            >
              Clear Cart
            </Button>
            <Button 
              onClick={onClose} 
              variant="outlined" 
              color="primary"
            >
              Close
            </Button>
          </Box>
        </Box>
        
        <Button
          onClick={handleCheckout}
          variant="contained"
          color="primary"
          size="large"
          disabled={cartItems.length === 0}
          fullWidth
        >
          Proceed to Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
}
