import React from 'react'

import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'

import SearchIcon from '@mui/icons-material/Search'

export default function SearchBar(props) {
    return (
        <Paper
            component="form"
            onSubmit={e => props.handleInputSubmit(e)}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={props.placeholder}
                inputProps={{ 'aria-label': 'search events' }}
                value={props.value}
                onChange={e => props.handleInputChange(e)}
            />
            <IconButton type='submit' sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}
