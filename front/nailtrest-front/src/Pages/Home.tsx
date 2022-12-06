import Button from '@mui/material/Button/Button';
import React from 'react';
import Ideas from './Ideas';
import Login from './Login';

const Home = () => {
    const token = localStorage.getItem('accessToken');

    return <div>{token ? <Ideas></Ideas> : <Login></Login>}</div>;
};

export default Home;
