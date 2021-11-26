import React from 'react'

import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import red from '@mui/material/colors/red';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurUser } from '../../../store/user-store/user-selectors'

const mapStateToProps = createStructuredSelector({
    cur_user: selectCurUser
})

export default connect(mapStateToProps)(function MentorListItem(props) {
    const {
        user:{
            name = 'Mentor',
            followers
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
            <CardActions disableSpacing p={2} sx={{justifyContent:'space-between',display:'flex'}}>
                <Typography
                    sx={{
                        overflow:'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        textTransform: 'capitalize',
                        color: 'text.secondary'
                    }}
                >
                    {name}
                </Typography>
                {
                    followers.includes(props.cur_user._id) ?
                    (
                        <Tooltip title='UnFollow me'>
                            <IconButton aria-label="share" onClick={ () => props.handleClickOpen(props.data, false) }>
                                <PersonRemoveAlt1Icon />
                            </IconButton>
                        </Tooltip>
                    ) :
                    (
                        <Tooltip title='Follow me'>
                            <IconButton aria-label="share" onClick={ () => props.handleClickOpen(props.data, true) }>
                                <PersonAddAlt1Icon />
                            </IconButton>
                        </Tooltip>
                    )
                }
                
            </CardActions>
        </Card>
    )
})
