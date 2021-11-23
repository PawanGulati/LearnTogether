import { Avatar, Card, CardActions, CardHeader, IconButton, Typography } from '@mui/material'
import React from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { red } from '@mui/material/colors';

export default function MentorListItem(props) {
    const {
        user:{
            name = 'Mentor'
        }
    } = props.data

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[300] }} aria-label="mentor">
                    {name[0].toUpperCase()}
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
            />
            <CardActions disableSpacing sx={{justifyContent:'space-between',display:'flex'}}>
                <Typography
                    sx={{
                        overflow:'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {name}
                </Typography>
                <IconButton aria-label="share">
                    <PersonAddAlt1Icon />
                </IconButton>
            </CardActions>
        </Card>
    )
}
