import React from 'react'

import Button from '@mui/material/Button'

export default function HomeThemedButton(props) {
    return (
        <Button
            aria-label='join-us'
            variant="contained"
            sx={{
                fontWeight:600,
                height:"80px",
                width:"220px",
                backgroundColor:'var(--theme-purple)',
                ":hover":{
                    backgroundColor:"var(--theme-purple)"
                },
                fontFamily:"Proxima Nova Alt",
                borderRadius:'10px'
            }}
            onClick={props.handleOpen}
        >
            <i>Join as </i>
            <span 
                style={{
                    letterSpacing:'1px', 
                    fontWeight:900, 
                    fontSize:'22px', 
                    color:"rgba(255,99,59,.6)", 
                    margin:"9px",
                }}>
                {props.text}
            </span>
        </Button>
    )
}
