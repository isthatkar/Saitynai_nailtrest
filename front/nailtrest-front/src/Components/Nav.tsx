import Button from '@mui/material/Button/Button';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
const Nav = () => {
    const token = localStorage.getItem('accessToken');
    const getRoles = useCallback(async () => {
        const data = await fetch('https://dentaclinic20221015140303.azurewebsites.net/api/me', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'GET'
        });
        const roles = await data.json();
        if (roles.includes('Admin')) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, []);

    const Logout = (e: any): void => {
        e.preventDefault();
        localStorage.removeItem('accessToken');
        return navigate('/login');
    };

    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
            <a className="navbar-brand" href="/">
                <BrushRoundedIcon width="30" height="30" className="d-inline-block align-top" />
                Nailtrest
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarsExample02"
                aria-controls="navbarsExample02"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample02">
                <ul className="navbar-nav mr-auto">
                    {token ? (
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={'/collections'}>
                                Collections
                            </Link>{' '}
                        </li>
                    ) : (
                        ''
                    )}
                    {token ? (
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={'/ideas'}>
                                Ideas
                            </Link>{' '}
                        </li>
                    ) : (
                        ''
                    )}
                    {token ? (
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={'/profile'}>
                                Profile
                            </Link>{' '}
                        </li>
                    ) : (
                        ''
                    )}
                    {!token ? (
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={'/login'}>
                                Login
                            </Link>{' '}
                        </li>
                    ) : (
                        ''
                    )}
                    {!token ? (
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={'/register'}>
                                Register
                            </Link>{' '}
                        </li>
                    ) : (
                        ''
                    )}
                </ul>
                {token ? (
                    <ul className="navbar-nav justify-content-right">
                        <li className="nav-item mr-1">
                            <Button onClick={(e) => Logout(e)}>Logout</Button>{' '}
                        </li>
                    </ul>
                ) : (
                    ''
                )}
            </div>
        </nav>
    );
};

export default Nav;
