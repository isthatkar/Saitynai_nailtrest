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
import Stack from '@mui/material/Stack/Stack';
import AddCollectionDialog from '../Components/AddCollectionDialog';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditCollectionDialog from '../Components/EditCollectionDialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Collections = () => {
    const [allIdeas, setAllIdeas] = useState<Idea[]>([]);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('accessToken');
    const id = localStorage.getItem('userId') as string;

    const getRoles = useCallback(async () => {
        const roles = localStorage.getItem('roles') as string;

        console.log(roles);
        if (roles.includes('admin')) {
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getIdeas = useCallback(async () => {
        const myIdeas = await fetch('https://localhost:7054/api/collections', {
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

    const onDelete = async (id: number) => {
        var token = localStorage.getItem('accessToken');
        const response = await fetch(`https://localhost:7054/api/collections/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'DELETE'
        });
        console.log(response);
        if (response.status === 204) {
            toast.success('Successfuly deleted collection !', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            toast.error('Could not delete collection !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        setOpen(false);
    };

    const onView = (id: number) => {
        console.log(`going to collection page ${id}`);
        return navigate(`/collections/${id}`);
    };

    return (
        <main>
            <ToastContainer />

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
                        Nail art collections
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Art is everywhere.
                    </Typography>
                    <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                        <AddCollectionDialog></AddCollectionDialog>
                    </Stack>
                </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    {allIdeas.map((card) => (
                        <Grid item xs={12} sm={6} md={4}>
                            <Card key="{card.id}" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia component="img" image="https://static.thenounproject.com/png/2717920-200.png" alt="random" />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {card.name}
                                    </Typography>
                                    <Typography>{card.description}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => onView(card.id)}>
                                        View ideas
                                    </Button>
                                    {isAdmin || card.userId === id ? (
                                        <Stack direction="row" spacing={2}>
                                            <EditCollectionDialog card={card}> </EditCollectionDialog>
                                            <Button size="small" color="error" onClick={handleClickOpen}>
                                                Delete
                                            </Button>
                                            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                                                <DialogTitle id="alert-dialog-title">{'Do you really want to delete this collection?'}</DialogTitle>
                                                <DialogContent>All of the collection ideas will also be deleted.</DialogContent>

                                                <DialogActions>
                                                    <Button onClick={handleClose} autoFocus>
                                                        Disagree
                                                    </Button>
                                                    <Button onClick={() => onDelete(card.id)}>Agree</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </Stack>
                                    ) : (
                                        ''
                                    )}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </main>
    );
};

export default Collections;
