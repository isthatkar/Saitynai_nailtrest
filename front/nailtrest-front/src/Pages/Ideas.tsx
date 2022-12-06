import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import jwtDecode from 'jwt-decode';
import { useCallback } from 'react';
import { Idea } from '../Types/types';
import { useState } from 'react';
import { useEffect } from 'react';

const Ideas = () => {
    const token = localStorage.getItem('accessToken');
    const [allIdeas, setAllIdeas] = useState<Idea[]>([]);

    const getIdeas = useCallback(async () => {
        const myIdeas = await fetch('https://localhost:7054/api/ideas', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'GET'
        });
        const ideas = await myIdeas.json();
        setAllIdeas(ideas);
    }, []);

    useEffect(() => {
        getIdeas();
    });
    return (
        <main>
            {/* Hero unit */}
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6
                }}
            >
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                        Nail art ideas
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Art is everywhere.
                    </Typography>
                </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    {allIdeas.map((card) => (
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia component="img" image={card.imageUrl} alt="random" />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {card.name}
                                    </Typography>
                                    <Typography>{card.description}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">View</Button>
                                    <Button size="small">Add comment</Button>
                                    <Button size="small">Edit</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </main>
    );
};

export default Ideas;
