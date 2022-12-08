import {  Stack } from '@chakra-ui/react';
import { Box, Paper } from '@mui/material';
import Typography from '@mui/material/Typography/Typography';
import React from 'react';
import { ReactComponent as ProfileSvg } from '../profile.svg';

const Profile = () => {
    const token = localStorage.getItem('accessToken');
    const userName = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    return (
        <Paper elevation={3}>
<Stack direction="column"   justifyContent="flex-start" alignItems="center" spacing={12}>
            <ProfileSvg width={200}></ProfileSvg>
            <Typography variant="h4" component="h2">
                Email: {email}
            </Typography>
            <Typography variant="h4" component="h2">
                Username: {userName}
            </Typography>
            <Box height={400}></Box>
        </Stack>
        </Paper>

    );
};

export default Profile;
