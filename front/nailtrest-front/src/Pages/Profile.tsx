import { Stack } from '@chakra-ui/react';
import Typography from '@mui/material/Typography/Typography';
import React from 'react';
import { ReactComponent as ProfileSvg } from '../profile.svg';

const Profile = () => {
    const token = localStorage.getItem('accessToken');
    const userName = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    return (
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
            <ProfileSvg width={200}></ProfileSvg>
            <Typography variant="h4" component="h2">
                {userName}
            </Typography>
            <Typography variant="h4" component="h2">
                {email}
            </Typography>
            ;
        </Stack>
    );
};

export default Profile;
