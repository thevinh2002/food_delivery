import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { useCart } from '../context/CartContext'; // Đường dẫn tùy dự án

export default function Foodcard({ id, name, description, price, img }) {
  const [open, setOpen] = useState(false);
  const { addToCart } = useCart();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    addToCart({ id, name, price });
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 280 }}>
        <CardMedia component="img" height="160" image={img} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">{name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40 }}>{description}</Typography>
          <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>${price}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" color="primary" fullWidth onClick={handleOpen}>
            Order Now
          </Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Order</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you want to order <strong>{name}</strong> for ${price}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => { handleConfirm(); }} variant="contained" color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
