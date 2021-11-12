import { Typography } from '@mui/material'
import React from 'react'

import LogoImg from '../../constants/images/logo.png'

export default function Logo(props) {
    return (
        <div style={{display:'flex', height:"70px"}}>
            <img src={LogoImg} alt="logo" loading="lazy"/>
            <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start", margin:"7px"}} >
                <Typography fontFamily="Proxima Nova Alt" variant="h6" color={props.color} fontWeight={900}>LEARN</Typography>
                <Typography fontFamily="Proxima Nova Alt" variant="h6" color={props.color}>TOGETHER</Typography>
            </div>
        </div>
    )
}
