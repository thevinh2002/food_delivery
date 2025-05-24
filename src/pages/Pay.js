import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Chip,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  LocationOn as LocationIcon,
  Payment as PaymentIcon,
  Check as CheckIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const DELIVERY_FEE = 2.00;

const steps = ['Cart Review', 'Delivery Information', 'Payment'];

const initialFormData = {
  fullName: '',
  phone: '',
  email: '',
  province: '',
  district: '',
  ward: '',
  streetAddress: '',
  note: '',
  paymentMethod: 'cod',
};

const initialFormErrors = {
  fullName: '',
  phone: '',
  email: '',
  province: '',
  district: '',
  ward: '',
  streetAddress: '',
};

// Sample data for dropdowns
const sampleDistricts = {
  HN: [
    { value: 'HBT', label: 'Hai Bà Trưng' },
    { value: 'HK', label: 'Hoàn Kiếm' },
    { value: 'CG', label: 'Cầu Giấy' },
    { value: 'TX', label: 'Thanh Xuân' },
    { value: 'HD', label: 'Hà Đông' },
  ],
  HCM: [
    { value: 'Q1', label: 'Quận 1' },
    { value: 'Q3', label: 'Quận 3' },
    { value: 'TB', label: 'Tân Bình' },
    { value: 'PN', label: 'Phú Nhuận' },
    { value: 'Q7', label: 'Quận 7' },
  ]
};

const sampleWards = {
  HBT: [
    { value: 'BD', label: 'Bách Khoa' },
    { value: 'QB', label: 'Quỳnh Lôi' },
    { value: 'TM', label: 'Thanh Miếu' },
  ],
  Q1: [
    { value: 'BN', label: 'Bến Nghé' },
    { value: 'BT', label: 'Bến Thành' },
    { value: 'CK', label: 'Cầu Kho' },
  ]
};

export default function Pay() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState({
    submitted: false,
    success: false,
    error: null
  });

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = totalPrice + DELIVERY_FEE;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  const validateForm = () => {
    let isValid = true;
    const errors = { ...initialFormErrors };

    // Validate fullName
    if (!formData.fullName.trim()) {
      errors.fullName = 'Vui lòng nhập họ tên';
      isValid = false;
    }

    // Validate phone
    if (!formData.phone.trim()) {
      errors.phone = 'Vui lòng nhập số điện thoại';
      isValid = false;
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.trim())) {
      errors.phone = 'Số điện thoại không hợp lệ';
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Vui lòng nhập email';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email không hợp lệ';
      isValid = false;
    }

    // Validate address fields
    if (!formData.province.trim()) {
      errors.province = 'Vui lòng chọn tỉnh/thành phố';
      isValid = false;
    }

    if (!formData.district.trim()) {
      errors.district = 'Vui lòng chọn quận/huyện';
      isValid = false;
    }

    if (!formData.ward.trim()) {
      errors.ward = 'Vui lòng chọn phường/xã';
      isValid = false;
    }

    if (!formData.streetAddress.trim()) {
      errors.streetAddress = 'Vui lòng nhập địa chỉ cụ thể';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const prepareOrderData = () => {
    return {
      customerInfo: {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: {
          province: formData.province.trim(),
          district: formData.district.trim(),
          ward: formData.ward.trim(),
          streetAddress: formData.streetAddress.trim(),
          fullAddress: `${formData.streetAddress.trim()}, ${formData.ward.trim()}, ${formData.district.trim()}, ${formData.province.trim()}`
        },
        note: formData.note.trim(),
      },
      orderDetails: {
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.price * item.quantity
        })),
        subtotal: totalPrice,
        deliveryFee: DELIVERY_FEE,
        total: finalTotal
      },
      paymentMethod: formData.paymentMethod,
      orderDate: new Date().toISOString()
    };
  };

  const handleNext = () => {
    if (activeStep === 1 && !validateForm()) {
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const orderData = prepareOrderData();
      
      // Here you would make your API call
      // const response = await api.createOrder(orderData);
      
      // Log order data for development
      console.log('Order data prepared:', orderData);
      
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOrderStatus({
        submitted: true,
        success: true,
        error: null
      });
      
      clearCart();
      
    } catch (error) {
      setOrderStatus({
        submitted: true,
        success: false,
        error: error.message || 'Đặt hàng thất bại. Vui lòng thử lại.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (cartItems.length === 0 && !orderStatus.success) {
    return (
      <Box sx={{ 
        p: 4, 
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom>Giỏ hàng trống</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Vui lòng thêm sản phẩm vào giỏ hàng
        </Typography>
        <Button
          variant="contained"
          onClick={handleGoBack}
          startIcon={<ArrowBackIcon />}
        >
          Tiếp tục mua sắm
        </Button>
      </Box>
    );
  }

  if (orderStatus.submitted && orderStatus.success) {
    return (
      <Box sx={{ 
        p: 4, 
        maxWidth: 600, 
        mx: 'auto',
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CheckIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Đặt hàng thành công!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          startIcon={<ArrowBackIcon />}
        >
          Về trang chủ
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <IconButton 
          onClick={handleGoBack}
          sx={{ mr: 2 }}
          aria-label="go back"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" display="inline">
          Thanh toán
        </Typography>
      </Box>

      {orderStatus.error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {orderStatus.error}
        </Alert>
      )}

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        <Box sx={{ flex: '1 1 auto', width: { xs: '100%', md: 'auto' } }}>
          {activeStep === 0 && (
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Xem lại giỏ hàng
              </Typography>
              <List>
                {cartItems.map((item) => (
                  <ListItem key={item.id} sx={{ py: 2 }}>
                    <ListItemAvatar>
                      <Avatar src={item.image} alt={item.name} variant="rounded" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={`Số lượng: ${item.quantity}`}
                      sx={{ mr: 2 }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {activeStep === 1 && (
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Thông tin giao hàng
              </Typography>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    required
                    fullWidth
                    label="Họ và tên"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    error={!!formErrors.fullName}
                    helperText={formErrors.fullName}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Số điện thoại"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={!!formErrors.phone}
                    helperText={formErrors.phone}
                  />
                </Stack>

                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />

                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
                    Địa chỉ giao hàng
                  </Typography>
                  <Stack spacing={2}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        required
                        fullWidth
                        select
                        label="Tỉnh/Thành phố"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        error={!!formErrors.province}
                        helperText={formErrors.province}
                      >
                        <MenuItem value="HN">Hà Nội</MenuItem>
                        <MenuItem value="HCM">TP. Hồ Chí Minh</MenuItem>
                        <MenuItem value="DN">Đà Nẵng</MenuItem>
                        <MenuItem value="HP">Hải Phòng</MenuItem>
                        <MenuItem value="CT">Cần Thơ</MenuItem>
                      </TextField>
                      <TextField
                        required
                        fullWidth
                        select
                        label="Quận/Huyện"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        error={!!formErrors.district}
                        helperText={formErrors.district}
                      >
                        {formData.province === 'HN' && sampleDistricts.HN.map(district => (
                          <MenuItem key={district.value} value={district.value}>
                            {district.label}
                          </MenuItem>
                        ))}
                        {formData.province === 'HCM' && sampleDistricts.HCM.map(district => (
                          <MenuItem key={district.value} value={district.value}>
                            {district.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Stack>
                    
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        required
                        fullWidth
                        select
                        label="Phường/Xã"
                        name="ward"
                        value={formData.ward}
                        onChange={handleInputChange}
                        error={!!formErrors.ward}
                        helperText={formErrors.ward}
                      >
                        {formData.district === 'HBT' && sampleWards.HBT.map(ward => (
                          <MenuItem key={ward.value} value={ward.value}>
                            {ward.label}
                          </MenuItem>
                        ))}
                        {formData.district === 'Q1' && sampleWards.Q1.map(ward => (
                          <MenuItem key={ward.value} value={ward.value}>
                            {ward.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        required
                        fullWidth
                        label="Số nhà, tên đường"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleInputChange}
                        error={!!formErrors.streetAddress}
                        helperText={formErrors.streetAddress}
                        placeholder="Ví dụ: 123 Đường ABC"
                        InputProps={{
                          sx: { '&::placeholder': { color: 'text.secondary' } }
                        }}
                      />
                    </Stack>
                  </Stack>
                </Box>

                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Ghi chú đơn hàng (không bắt buộc)"
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Giao hàng trong giờ hành chính"
                />
              </Stack>
            </Paper>
          )}

          {activeStep === 2 && (
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PaymentIcon />
                  Phương thức thanh toán
                </Box>
              </Typography>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                >
                  <Paper variant="outlined" sx={{ mb: 2, p: 2 }}>
                    <FormControlLabel
                      value="cod"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="subtitle1">Thanh toán khi nhận hàng (COD)</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Thanh toán bằng tiền mặt khi nhận hàng
                          </Typography>
                        </Box>
                      }
                    />
                  </Paper>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="subtitle1">Thanh toán bằng thẻ</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Thanh toán an toàn bằng thẻ tín dụng/ghi nợ
                          </Typography>
                        </Box>
                      }
                    />
                  </Paper>
                </RadioGroup>
              </FormControl>
            </Paper>
          )}

          <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
              startIcon={<ArrowBackIcon />}
            >
              Quay lại
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isLoading}
                endIcon={isLoading ? <CircularProgress size={20} /> : <CheckIcon />}
              >
                {isLoading ? 'Đang xử lý...' : 'Hoàn tất đặt hàng'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
              >
                Tiếp tục
              </Button>
            )}
          </Stack>
        </Box>

        <Box sx={{ width: { xs: '100%', md: '380px' } }}>
          <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Tổng quan đơn hàng
            </Typography>
            <List disablePadding>
              <ListItem sx={{ px: 0 }}>
                <ListItemText primary={`Tổng tiền (${cartItems.length} món)`} />
                <Typography variant="body1">
                  ${totalPrice.toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemText primary="Phí giao hàng" />
                <Typography variant="body1">
                  ${DELIVERY_FEE.toFixed(2)}
                </Typography>
              </ListItem>
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Tổng cộng:</Typography>
              <Typography variant="h6" color="primary.main">
                ${finalTotal.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Chip
                icon={<LocationIcon />}
                label="Giao hàng miễn phí cho đơn từ $50"
                color="primary"
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Box>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
}