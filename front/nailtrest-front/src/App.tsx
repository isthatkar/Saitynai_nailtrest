import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Nav from './Components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Typography from '@mui/material/Typography/Typography';
import Box from '@mui/material/Box/Box';
import { Copyright } from '@mui/icons-material';
import Ideas from './Pages/Ideas';
import Profile from './Pages/Profile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Collections from './Pages/Collections';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/ideas" element={<Ideas />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/collections" element={<Collections />} />
                </Routes>
            </BrowserRouter>
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Nailtrest
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                    T120B165 Saityno taikomųjų programų projektavimas. Rugile Karengaite IFF-9/5
                </Typography>
                <Copyright />
            </Box>
        </div>
    );
}

export default App;
