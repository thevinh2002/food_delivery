import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Avatar,
    Grid,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Button,
    TextField,
} from '@mui/material';
import {
    Person,
    Email,
    Phone,
    LocationOn,
    CalendarToday,
    Edit,
} from '@mui/icons-material';
import Header from '../components/Header';

const User = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+84 123 456 789',
        address: 'Ho Chi Minh City, Vietnam',
        birthdate: '1990-01-01',
        avatar: 'https://source.unsplash.com/random/150x150',
        bio: 'Food enthusiast and regular customer. Love trying new restaurants and cuisines.',
    });

    const [editedData, setEditedData] = useState(userData);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedData(userData);
    };

    const handleSave = () => {
        setUserData(editedData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData(userData);
    };

    const handleChange = (field) => (event) => {
        setEditedData({
            ...editedData,
            [field]: event.target.value,
        });
    };

    return (
        <>
            <Header />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Grid container spacing={4}>
                        {/* Left Column - Avatar and Basic Info */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                                <Avatar
                                    src={userData.avatar}
                                    sx={{ width: 150, height: 150, mb: 2 }}
                                />
                                <Typography variant="h5" gutterBottom>
                                    {userData.name}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 2 }}>
                                    {userData.bio}
                                </Typography>
                                {!isEditing && (
                                    <Button
                                        variant="contained"
                                        startIcon={<Edit />}
                                        onClick={handleEdit}
                                        sx={{ mt: 2 }}
                                    >
                                        Edit Profile
                                    </Button>
                                )}
                            </Box>
                        </Grid>

                        {/* Right Column - Detailed Information */}
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6" gutterBottom>
                                Personal Information
                            </Typography>
                            <Divider sx={{ mb: 3 }} />

                            {isEditing ? (
                                <Box component="form" sx={{ '& .MuiTextField-root': { mb: 2 } }}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        value={editedData.name}
                                        onChange={handleChange('name')}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        value={editedData.email}
                                        onChange={handleChange('email')}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Phone"
                                        value={editedData.phone}
                                        onChange={handleChange('phone')}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        value={editedData.address}
                                        onChange={handleChange('address')}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Birthdate"
                                        type="date"
                                        value={editedData.birthdate}
                                        onChange={handleChange('birthdate')}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Bio"
                                        multiline
                                        rows={4}
                                        value={editedData.bio}
                                        onChange={handleChange('bio')}
                                    />
                                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                                        <Button variant="contained" onClick={handleSave}>
                                            Save Changes
                                        </Button>
                                        <Button variant="outlined" onClick={handleCancel}>
                                            Cancel
                                        </Button>
                                    </Box>
                                </Box>
                            ) : (
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Person />
                                        </ListItemIcon>
                                        <ListItemText primary="Name" secondary={userData.name} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Email />
                                        </ListItemIcon>
                                        <ListItemText primary="Email" secondary={userData.email} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Phone />
                                        </ListItemIcon>
                                        <ListItemText primary="Phone" secondary={userData.phone} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <LocationOn />
                                        </ListItemIcon>
                                        <ListItemText primary="Address" secondary={userData.address} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CalendarToday />
                                        </ListItemIcon>
                                        <ListItemText primary="Birthdate" secondary={userData.birthdate} />
                                    </ListItem>
                                </List>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    );
};

export default User;
