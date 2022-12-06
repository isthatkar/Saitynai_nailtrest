import { Img, Stack } from '@chakra-ui/react';
import Button from '@mui/material/Button/Button';
import ButtonBase from '@mui/material/ButtonBase/ButtonBase';
import Card from '@mui/material/Card/Card';
import CardActions from '@mui/material/CardActions/CardActions';
import CardContent from '@mui/material/CardContent/CardContent';
import CardMedia from '@mui/material/CardMedia/CardMedia';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import React from 'react';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Ideas from './Ideas';
import Login from './Login';

const IdeasView = () => {
    const token = localStorage.getItem('accessToken');
    const { id } = useParams();

    const getCollection = useCallback(async () => {
        const myCollection = await fetch(`https://localhost:7054/api/collections/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'GET'
        });
        const collection = await myCollection.json();
    }, []);

    return (
        <Grid container direction="row" justifyContent="space-evenly" alignItems="stretch">
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                    Idea title
                </Typography>
                <Paper elevation={1}>
                    <Stack>
                        <Img src="https://www.elegantweddinginvites.com/wedding-blog/wp-content/uploads/2020/07/beautiful-bridal-nails-for-your-wedding-look.jpg"></Img>
                        <Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" component="h2">
                                        Description blablablsdbkjafnjkdsgnldskgiksjgisd dsjgoisfgjsgrs oirsgjrsiogjmsriog rsigjkrsmigon rsoigmjrsilgns iorsm gnnrsiojgrs
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="body1" component="h6">
                                        Difficult
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="body1">50 minutes</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Required means </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Instructions </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Button variant="outlined">Edit</Button>
                        <Button variant="outlined" color="error">
                            Delete
                        </Button>
                    </Stack>
                </Paper>
            </Container>
            <Container> </Container>
        </Grid>
    );
};

export default IdeasView;
