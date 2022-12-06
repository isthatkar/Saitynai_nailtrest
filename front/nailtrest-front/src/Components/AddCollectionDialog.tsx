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

const AddCollectionDialog = () => {
    const token = localStorage.getItem('accessToken');
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = async () => {
        await addCollection();
        setOpen(false);
    };

    const addCollection = async (): Promise<void> => {
        const collectionDto = {
            name: name,
            description: description
        };
        const response = await fetch(`https://localhost:7054/api/collections`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify(collectionDto)
        });
        console.log(response);
        if (response.status === 201) {
            console.log('showing toast');
            toast.success('Successfuly added collection !', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            toast.error('Failed to add collection!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    return (
        <div>
            <ToastContainer />

            <Button variant="outlined" onClick={handleClickOpen}>
                Add collection
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new collection</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please enter collection title and description</DialogContentText>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '50ch' }
                        }}
                    >
                        <div>
                            <TextField onChange={(e) => setName(e.target.value)} required id="outlined-password-input" label="Name" type="text" />{' '}
                        </div>

                        <div>
                            <TextField onChange={(e) => setDescription(e.target.value)} required id="outlined-password-input" label="Description" type="text" />
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddCollectionDialog;
