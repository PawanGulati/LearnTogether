import React from 'react'

import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'

export default function PaperInput(props) {
    return (
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', height:'52px' }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                value={props.topic}
                onChange={e => props.handleInputChange(e)}
                placeholder={props.placeholder}
                inputProps={{ 
                    'aria-label': 'search events',
                }}
                autoFocus
            />
            
        </Paper>
    )
}
