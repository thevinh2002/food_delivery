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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../context/CartContext';

export default function CartModal({ open, onClose }) {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleIncrease = (id, currentQty) => {
    updateQuantity(id, currentQty + 1);
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      updateQuantity(id, currentQty - 1);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Your Cart</DialogTitle>
      <DialogContent dividers>
        {cartItems.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          <List>
            {cartItems.map(({ id, name, price, quantity }) => (
              <ListItem
                key={id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(id)}>
                    <DeleteIcon />
                  </IconButton>
                }
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <ListItemText
                  primary={name}
                  secondary={`$${price} each`}
                  sx={{ flex: 1 }}
                />

                {/* Control số lượng */}
                <IconButton onClick={() => handleDecrease(id, quantity)} size="small" color="primary">
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ mx: 1 }}>{quantity}</Typography>
                <IconButton onClick={() => handleIncrease(id, quantity)} size="small" color="primary">
                  <AddIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Typography sx={{ flexGrow: 1, fontWeight: 'bold', ml: 2 }}>
          Total: ${totalPrice.toFixed(2)}
        </Typography>
        <Button onClick={clearCart} color="error" disabled={cartItems.length === 0}>
          Clear Cart
        </Button>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
