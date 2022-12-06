import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box/Box';

const EditCollectionDialog = (props: any) => {
    const token = localStorage.getItem('accessToken');
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(props.card.name);
    const [description, setDescription] = React.useState(props.card.description);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = async () => {
        await addCollection();
        setOpen(false);
    };

    const addCollection = async (): Promise<void> => {
        const collectionDto = {
            name: name,
            description: description
        };
        const response = await fetch(`https://localhost:7054/api/collections/${props.card.id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'PUT',
            body: JSON.stringify(collectionDto)
        });
        console.log(response);
        if (response.status === 200) {
            toast.success('Successfuly changed collection !', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            toast.error('Could not change collection !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    return (
        <div>
            <ToastContainer />

            <Button size="small" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit collection</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please edit collection title and description</DialogContentText>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '50ch' }
                        }}
                    >
                        <div>
                            <TextField onChange={(e) => setName(e.target.value)} defaultValue={props.card.name} required id="outlined-password-input" type="text" />{' '}
                        </div>

                        <div>
                            <TextField onChange={(e) => setDescription(e.target.value)} defaultValue={props.card.description} required id="outlined-password-input" type="text" />
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleEdit}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditCollectionDialog;
