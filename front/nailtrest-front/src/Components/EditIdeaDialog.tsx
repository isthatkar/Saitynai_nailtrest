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
import { useEffect } from 'react';
import { Idea } from '../Types/types';

const EditIdeaDialog = (props: any) => {
    const [collectionId, setCollectionId] = React.useState(props.collectionId);
    const [ideaId, setIdeaId] = React.useState(props.ideaId);
    const [idea, setIdea] = React.useState<Idea>();

    const token = localStorage.getItem('accessToken');
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(idea?.name);
    const [imageUrl, setImageUrl] = React.useState(idea?.imageUrl);
    const [complexity, setCopmlexity] = React.useState(idea?.complexity);
    const [requiredMeans, setRequiredMeans] = React.useState(idea?.requiredMeans);
    const [instruction, setInstruction] = React.useState(idea?.instruction);

    const [description, setDescription] = React.useState(idea?.description);

    const handleClickOpen = () => {
        setOpen(true);
        console.log(idea);
        console.log(collectionId);
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
        const response = await fetch(`https://localhost:7054/api/collections/${collectionId}/ideas/${ideaId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'PUT',
            body: JSON.stringify(ideaDto)
        });
        console.log(response);
        if (response.status === 200) {
            console.log('showing toast');
            toast.success('Successfuly edited idea !', {
                position: toast.POSITION.TOP_RIGHT
            });
            window.location.reload();
        } else {
            toast.error('Failed to edit idea!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    const getIdea = async () => {
        const myIdea = await fetch(`https://localhost:7054/api/collections/${collectionId}/ideas/${ideaId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'GET'
        });
        const ideaa = await myIdea.json();
        setIdea(ideaa);
    };

    useEffect(() => {
        getIdea();
    });

    return (
        <div>
            <ToastContainer />

            <Button variant="outlined" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please edit the idea information</DialogContentText>
                    <form onSubmit={handleAdd}>
                        <div className="mb-3">
                            <input defaultValue={idea?.name} type="text" required className="form-control" id="exampleInputEmail1" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input defaultValue={idea?.description} required type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input defaultValue={idea?.imageUrl} required type="url" className="form-control" id="exampleInputPassword1" onChange={(e) => setImageUrl(e.target.value)} />
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
                            <input defaultValue={idea?.requiredMeans} required type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setRequiredMeans(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input defaultValue={idea?.instruction} required type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setInstruction(e.target.value)} />
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

export default EditIdeaDialog;
function useCallback(arg0: () => Promise<void>, arg1: never[]) {
    throw new Error('Function not implemented.');
}
