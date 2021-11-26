import React from 'react'

import Typography from '@mui/material/Typography'

import LogoImg from '../../constants/images/logo.webp'

export default function Logo(props) {
    return (
        <div style={{display:'flex', height:"30%"}}>
            <img src={LogoImg} alt="logo" style={{height:'70px'}} loading="lazy"/>
            <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start", margin:"7px"}} >
                <Typography fontFamily="Proxima Nova Alt" variant="h6" color={props.color} fontWeight={900}>LEARN</Typography>
                <Typography fontFamily="Proxima Nova Alt" variant="h6" color={props.color}>TOGETHER</Typography>
            </div>
        </div>
    )
}
