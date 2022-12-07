import { Img, Stack } from '@chakra-ui/react';
import { Dialog, DialogActions, Grid } from '@mui/material';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Card from '@mui/material/Card/Card';
import CardActions from '@mui/material/CardActions/CardActions';
import CardContent from '@mui/material/CardContent/CardContent';
import CardMedia from '@mui/material/CardMedia/CardMedia';
import Container from '@mui/material/Container/Container';
import DialogContent from '@mui/material/DialogContent/DialogContent';
import DialogTitle from '@mui/material/DialogTitle/DialogTitle';
import Typography from '@mui/material/Typography/Typography';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditIdeaDialog from '../Components/EditIdeaDialog';
import { Idea } from '../Types/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IdeasView = () => {
    const token = localStorage.getItem('accessToken');
    const [isAdmin, setIsAdmin] = useState(false);
    const [idea, setIdea] = useState<Idea>();
    const userId = localStorage.getItem('userId') as string;
    const { collectionid, id } = useParams();
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const getIdea = useCallback(async () => {
        const myIdea = await fetch(`https://localhost:7054/api/collections/${collectionid}/ideas/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'GET'
        });
        const ideaa = await myIdea.json();
        setIdea(ideaa);

        const roles = localStorage.getItem('roles') as string;

        console.log(roles);
        if (roles.includes('admin')) {
            console.log('user is admin');
            setIsAdmin(true);
        } else {
            console.log('user is NOT admin');
            setIsAdmin(false);
        }
        if (ideaa.userId === userId) {
            setShow(true);
        }
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getIdea();
    });

    const onDelete = async () => {
        var token = localStorage.getItem('accessToken');
        const response = await fetch(`https://localhost:7054/api/collections/${collectionid}/ideas/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'DELETE'
        });
        console.log(response);
        if (response.status === 204) {
            toast.success('Successfuly deleted idea !', {
                position: toast.POSITION.TOP_RIGHT
            });
            setOpen(false);
            return navigate(`/collections/${collectionid}`);
        } else {
            toast.error('Could not delete idea !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        setOpen(false);
    };

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <ToastContainer />

            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                    {idea?.name}
                </Typography>
            </Container>
            <Card sx={{ display: 'flex', minWidth: 700, maxHeight: 700 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto', minWidth: 300 }}>
                        <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={12}>
                            <Typography variant="h6" color="text.secondary" component="div">
                                {idea?.description}
                            </Typography>
                            <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
                                <Typography variant="subtitle2" component="h6">
                                    Complexity:
                                </Typography>
                                <Typography variant="body1" component="h6">
                                    {idea?.complexity}
                                </Typography>
                            </Stack>

                            <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
                                <Typography variant="subtitle2" component="h6">
                                    Required means:
                                </Typography>
                                <Typography variant="body1"> {idea?.requiredMeans}</Typography>
                            </Stack>
                            <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0}>
                                <Typography variant="subtitle2" component="h6">
                                    Instructions:
                                </Typography>
                                <Typography variant="body1"> {idea?.instruction}</Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                    <CardActions>
                        <Stack spacing={3} direction="row" justifyContent="space-between">
                            <Button variant="outlined">Comment</Button>
                            {isAdmin || show ? (
                                <Stack spacing={3} direction="row" justifyContent="space-between">
                                    <EditIdeaDialog ideaId={id} collectionId={collectionid}></EditIdeaDialog>
                                    <Button size="small" color="error" onClick={handleClickOpen}>
                                        Delete
                                    </Button>
                                    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                                        <DialogTitle id="alert-dialog-title">{'Do you really want to delete this idea?'}</DialogTitle>

                                        <DialogActions>
                                            <Button onClick={handleClose} autoFocus>
                                                Disagree
                                            </Button>
                                            <Button onClick={() => onDelete()}>Agree</Button>
                                        </DialogActions>
                                    </Dialog>
                                </Stack>
                            ) : (
                                ''
                            )}
                        </Stack>
                    </CardActions>
                </Box>
                <CardMedia component="img" image={idea?.imageUrl} alt="Nail art idea" />
            </Card>
        </Container>
    );
};

export default IdeasView;
