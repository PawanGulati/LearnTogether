import React from 'react'

import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';

export default function DemandEventListItem(props) {
    const {
        topics,
        students
    } = props.data

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap', height:'5em', overflow:'auto'}}>
                    {
                        topics.map((topic, idx) => 
                            <Chip label={topic} key={idx} sx={{textTransform: 'capitalize', margin:'3px 0px'}}/>
                        )
                    }
                </Stack>
                <Typography align='left' variant='body2' color='text.secondary' my={2}>
                    {students.length} interested students
                </Typography>
                <AvatarGroup spacing='small' max={3} sx={{justifyContent: 'flex-end', padding:'0px 10px'}}>
                    <Avatar />
                    <Avatar />
                    <Avatar />
                    <Avatar />
                </AvatarGroup>
            </CardContent>
            <CardActions disableSpacing sx={{justifyContent:'space-between',display:'flex'}}>
                <Tooltip title='Book Event'>
                    <IconButton aria-label="share" onClick={()=> props.handleOpenPrompt(props.data) }>
                        <EventAvailableOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    )
}
