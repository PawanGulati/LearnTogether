import React from 'react'
import moment from 'moment'

import { IconButton, Tooltip, Typography } from '@mui/material'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';

import RoundedPaper from '../RoundedPaper'
import { Box } from '@mui/system';

const listPaperItemStyles = {
//   backgroundColor: 'primary.main',
//   color: '#fff',
  borderRadius:2,
  flexDirection:'row',
  justifyContent:'space-evenly',
  alignItems:'center',
  padding:1,
  border: '2px solid var(--primary-blue)'
}

export default function BookingListItem({data, ...xtra}) {
    const {
        event:{
            students,
            topics,
        },
        scheduleOn
    } = data;

    return (
        <RoundedPaper height={50} extraStyles={listPaperItemStyles}>
            <div style={{width:'100%'}}>
                <Typography variant='subtitle2'>{students.length} Students</Typography>
            </div>
            <Box 
                sx={{
                    width:'100%', 
                    height:'100%',
                    overflow:'hidden', 
                    display:'inline-block', 
                    textOverflow:'ellipsis',
                    whiteSpace: 'nowrap'
                }}
            >
                {
                   topics.map((topic, id) => 
                        <Typography 
                            component='span' 
                            key={id} 
                            variant='subtitle2'
                            mr={1}
                            sx={{
                                textTransform: 'capitalize',
                            }}
                        >
                            {topic + (id === topics.length-1 ? '':',')} 
                        </Typography>
                    )
                }
            </Box>
            <div style={{width:'100%'}}>
                <Typography variant='subtitle2'>{moment(scheduleOn).format('DD/MM/YYYY')}</Typography>
            </div>
            {
                xtra.options && (
                    <Tooltip title='Join Event' >
                        <IconButton onClick={()=>xtra.handleOpenPropmt(data, true)} >
                            <GroupAddOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                )
            }
        </RoundedPaper>
    )
}
