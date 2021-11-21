import React from 'react'
import { IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function PaperInput(props) {
    return (
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                value={props.topic}
                onChange={e => props.handleInputChange(e)}
                placeholder={props.placeholder}
                inputProps={{ 'aria-label': 'search events' }}
            />
        </Paper>
    )
}
