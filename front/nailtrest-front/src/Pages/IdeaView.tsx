import { Img, Stack } from '@chakra-ui/react';
import { Avatar, Dialog, DialogActions, DialogContent, DialogContentText, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField } from '@mui/material';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Card from '@mui/material/Card/Card';
import CardActions from '@mui/material/CardActions/CardActions';
import CardContent from '@mui/material/CardContent/CardContent';
import CardMedia from '@mui/material/CardMedia/CardMedia';
import Container from '@mui/material/Container/Container';
import DialogTitle from '@mui/material/DialogTitle/DialogTitle';
import Typography from '@mui/material/Typography/Typography';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditIdeaDialog from '../Components/EditIdeaDialog';
import { Idea, Comment } from '../Types/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

const IdeasView = () => {
    const token = localStorage.getItem('accessToken');
    const [isAdmin, setIsAdmin] = useState(false);
    const [idea, setIdea] = useState<Idea>();
    const [comments, setCmoments] = useState<Comment[]>([]);
    const userId = localStorage.getItem('userId') as string;
    const { collectionid, id } = useParams();
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const [newComment, setNewComment] = useState('');

    const [openCommentDelete, setOpenCommentDelete] = useState(false);
    const [openEditComment, setOpenEditComment] = useState(false);

    const handleClickOpenCommentDelete = () => {
        setOpenCommentDelete(true);
    };

    const handleCloseCommentDelete = () => {
        setOpenCommentDelete(false);
    };

    const handleClickEditComment = () => {
        setOpenEditComment(true);
    };

    const handleCloseEditComment = () => {
        setOpenEditComment(false);
    };

    const handleEditComment = async (commentContent: string, commentId: number): Promise<void> => {
        if (newComment === '') {
            if (commentContent === '') {
                return;
            }

            setNewComment(commentContent);
        }

        const commentDto = {
            content: newComment
        };
        const response = await fetch(`https://localhost:7054/api/ideas/${id}/comments/${commentId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'PUT',
            body: JSON.stringify(commentDto)
        });
        console.log(response);
        if (response.status === 200) {
            toast.success('Successfuly changed comment !', {
                position: toast.POSITION.TOP_RIGHT
            });
            setOpenEditComment(false);
        } else {
            toast.error('Could not chang comment !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        getComments();
        setOpenEditComment(false);
    };

    const onDeleteComment = async (commentId: number) => {
        var token = localStorage.getItem('accessToken');
        const response = await fetch(`https://localhost:7054/api/ideas/${id}/comments/${commentId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'DELETE'
        });
        console.log(response);
        if (response.status === 204) {
            toast.success('Successfuly deleted comment !', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            toast.error('Could not delete comment !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        getComments();
        setOpenCommentDelete(false);
    };

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

        if (roles.includes('Admin')) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
        if (ideaa.userId === userId) {
            setShow(true);
        }
    }, []);

    const getComments = useCallback(async () => {
        const myIdea = await fetch(`https://localhost:7054/api/ideas/${id}/comments`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'GET'
        });
        const ideaComments = await myIdea.json();
        console.log(ideaComments);
        setCmoments(ideaComments);
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getIdea();
        getComments();
    }, []);

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

    const addComment = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (content === '') {
            console.log('empty comment');
            return;
        }

        console.log(content);
        const response = await fetch(`https://localhost:7054/api/ideas/${id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                content
            })
        });

        if (response.status == 201) {
            console.log('added comment successfullyy');
            setContent('');
            getComments();
        } else {
            console.log('could not comment ');
        }
    };

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <ToastContainer />
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                    {idea?.name}
                </Typography>
            </Container>
            <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={12}>
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
                <Paper elevation={3} sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
                    <Stack direction="row" sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
                        <TextField value={content} onChange={(e) => setContent(e.target.value)} multiline id="outlined-basic" label="Add comment" variant="standard" fullWidth />
                        <Button onClick={addComment}>Post</Button>
                    </Stack>
                    <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
                        {comments.map((comment) => (
                            <ListItem
                                secondaryAction={
                                    isAdmin || show ? (
                                        <Stack spacing={12} direction="row" justifyContent="space-between">
                                            <IconButton edge="end" aria-label="edit" onClick={handleClickEditComment}>
                                                <EditIcon />
                                            </IconButton>

                                            <Dialog open={openEditComment} onClose={handleCloseEditComment}>
                                                <DialogTitle>Edit comment</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>Please edit your comment </DialogContentText>
                                                    <Box
                                                        component="form"
                                                        noValidate
                                                        autoComplete="off"
                                                        sx={{
                                                            '& .MuiTextField-root': { m: 1, width: '50ch' }
                                                        }}
                                                    >
                                                        <div>
                                                            <TextField onChange={(e) => setNewComment(e.target.value)} defaultValue={comment.content} required type="text" />
                                                        </div>
                                                    </Box>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseEditComment}>Cancel</Button>
                                                    <Button onClick={() => handleEditComment(comment.content, comment.id)}>Save</Button>
                                                </DialogActions>
                                            </Dialog>

                                            <IconButton edge="end" aria-label="delete" onClick={handleClickOpenCommentDelete}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <Dialog open={openCommentDelete} onClose={handleCloseCommentDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                                                <DialogTitle id="alert-dialog-title">{'Do you really want to delete this comment?'}</DialogTitle>

                                                <DialogActions>
                                                    <Button onClick={handleCloseCommentDelete} autoFocus>
                                                        Disagree
                                                    </Button>
                                                    <Button onClick={() => onDeleteComment(comment.id)}>Agree</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </Stack>
                                    ) : (
                                        ''
                                    )
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={comment.content} secondary={comment.userName} />
                            </ListItem>
                        ))}
                    </List>{' '}
                </Paper>
            </Stack>
        </Container>
    );
};

export default IdeasView;
