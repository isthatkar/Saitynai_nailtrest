import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useCallback } from 'react';
import { Idea } from '../Types/types';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddIdeaDialog from '../Components/AddIdeaDialog';
import Stack from '@mui/material/Stack/Stack';

function CollectionIdeas() {
    const { id } = useParams();
    const token = localStorage.getItem('accessToken');
    const [allIdeas, setAllIdeas] = useState<Idea[]>([]);
    const [collectionName, setName] = useState('');
    const [collectionUserId, setCollectionUserId] = useState('');
    const [collectionDescription, setDescription] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const userId = localStorage.getItem('userId') as string;
    const navigate = useNavigate();

    const getCollection = useCallback(async () => {
        const myCollection = await fetch(`https://localhost:7054/api/collections/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'GET'
        });
        const collection = await myCollection.json();
        setName(collection.name);
        setDescription(collection.description);
        setCollectionUserId(collection.userId);
    }, []);

    const getRoles = useCallback(async () => {
        const roles = localStorage.getItem('roles') as string;

        console.log(roles);
        if (roles.includes('Admin')) {
            console.log('user is admin');
            setIsAdmin(true);
        } else {
            console.log('user is NOT admin');
            setIsAdmin(false);
        }
    }, []);

    useEffect(() => {
        getRoles();
    }, []);

    const getIdeas = useCallback(async () => {
        const allIdeas = await fetch(`https://localhost:7054/api/collections/${id}/ideas`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'GET'
        });
        const myIdeas = await allIdeas.json();
        setAllIdeas(myIdeas);
    }, []);

    useEffect(() => {
        getCollection();
        getIdeas();
    });

    const onView = (ideaId: number) => {
        console.log(`going to collection page ${ideaId}`);
        return navigate(`/${id}/idea/${ideaId}`);
    };

    return (
        <main>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6
                }}
            >
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                        {collectionName}
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        {collectionDescription}
                    </Typography>
                    <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                        {isAdmin || collectionUserId === userId ? <AddIdeaDialog collectionId={id}></AddIdeaDialog> : ''}
                    </Stack>
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
                                    <Button size="small" onClick={() => onView(card.id)}>
                                        View
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </main>
    );
}

export default CollectionIdeas;
