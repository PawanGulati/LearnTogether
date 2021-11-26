import React from 'react'

import Breadcrumbs from '@mui/material/Breadcrumbs'

import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { NavLink } from 'react-router-dom';

export default function ProfileNavBar() {
    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                <NavLink
                    style={{ display: 'flex', alignItems: 'center' }}
                    to="/"
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                </NavLink>
                <NavLink
                    style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}
                    to="/profile"
                >
                    Profile
                </NavLink>
            </Breadcrumbs>
        </div>
    )
}
