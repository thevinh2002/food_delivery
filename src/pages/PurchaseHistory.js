import React from 'react';
import Header  from '../components/Header';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Container,
} from '@mui/material';

// Mock data for demonstration
const purchaseHistory = [
    {
        id: '#ORD001',
        date: '2024-03-20',
        items: ['Pizza Margherita', 'Coca Cola'],
        total: 25.99,
        status: 'Delivered',
    },
    {
        id: '#ORD002',
        date: '2024-03-18',
        items: ['Chicken Burger', 'French Fries', 'Sprite'],
        total: 18.50,
        status: 'Processing',
    },
    {
        id: '#ORD003',
        date: '2024-03-15',
        items: ['Pasta Carbonara', 'Garlic Bread', 'Tiramisu'],
        total: 32.75,
        status: 'Delivered',
    },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Delivered':
            return 'success';
        case 'Processing':
            return 'warning';
        case 'Cancelled':
            return 'error';
        default:
            return 'default';
    }
};

const PurchaseHistory = () => {
    return (
        <>
            <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Purchase History
            </Typography>
            <Paper elevation={3}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Items</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {purchaseHistory.map((order) => (
                                <TableRow key={order.id} hover>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                            {order.items.map((item, index) => (
                                                <Typography key={index} variant="body2">
                                                    • {item}
                                                </Typography>
                                            ))}
                                        </Box>
                                    </TableCell>
                                    <TableCell>${order.total.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={order.status}
                                            color={getStatusColor(order.status)}
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    </>
    );
};

export default PurchaseHistory;
