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
import { ImageAspectRatioOutlined } from '@mui/icons-material';
import { SyntheticEvent } from 'react';

const AddIdeaDialog = (props: any) => {
    const token = localStorage.getItem('accessToken');
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const [complexity, setCopmlexity] = React.useState('Easy');
    const [requiredMeans, setRequiredMeans] = React.useState('');
    const [instruction, setInstruction] = React.useState('');

    const [collectionId, setCollectionId] = React.useState(props.collectionId);
    const [description, setDescription] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = async (e: SyntheticEvent) => {
        e.preventDefault();
        await addIdea();
        setOpen(false);
    };

    const addIdea = async (): Promise<void> => {
        console.log('daeeeeejau ciaaa');
        const ideaDto = {
            name: name,
            description: description,
            imageUrl: imageUrl,
            complexity: complexity,
            requiredMeans: requiredMeans,
            instruction: instruction
        };
        const response = await fetch(`https://localhost:7054/api/collections/${collectionId}/ideas`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify(ideaDto)
        });
        console.log(response);
        if (response.status === 201) {
            console.log('showing toast');
            toast.success('Successfuly added idea !', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            toast.error('Failed to add idea!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    return (
        <div>
            <ToastContainer />

            <Button variant="outlined" onClick={handleClickOpen}>
                Add new idea
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Add new idea</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please enter idea information</DialogContentText>
                    <form onSubmit={handleAdd}>
                        <div className="mb-3">
                            <input placeholder="Title" type="text" required className="form-control" id="exampleInputEmail1" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input placeholder="Description" required type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input placeholder="imageUrl" required type="url" className="form-control" id="exampleInputPassword1" onChange={(e) => setImageUrl(e.target.value)} />
                        </div>
                        <select className="form-select mb-3" aria-label="Default select example" onChange={(e) => setCopmlexity(e.target.value)}>
                            <option value="Easy" selected>
                                Easy
                            </option>
                            <option value="Normal">Normal</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert </option>
                        </select>
                        <div className="mb-3">
                            <input placeholder="Required means" required type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setRequiredMeans(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input placeholder="Instructions" required type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setInstruction(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddIdeaDialog;
