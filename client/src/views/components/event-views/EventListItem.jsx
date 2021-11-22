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

export default function EventListItem({data, ...xtra}) {
    const {
        students,
        topics,
        bookings
    } = data;

    return (
        <RoundedPaper height={50} extraStyles={listPaperItemStyles}>
            <div style={{width:'100%'}}>
                <Typography variant='subtitle2'>{students.length} Students</Typography>
            </div>
            <Box 
                sx={{
                    width:'100%', 
                    height: '100%',
                    overflow:'hidden', 
                    display:'inline-block', 
                    textOverflow:'ellipsis'
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
            {
                bookings.length > 0 && (
                    <>
                        <div style={{width:'100%'}}>
                            <Typography variant='subtitle2'>{xtra.mentor}</Typography>
                        </div>
                        <div style={{width:'100%'}}>
                            <Typography variant='subtitle2'>{moment(xtra.date).format('DD/MM/YYYY')}</Typography>
                        </div>
                    </>
                )
            }
            {
                xtra.options && (
                    <Tooltip title='Join Event' >
                        <IconButton onClick={()=>xtra.handleOpenJoinPropmt(data, true)} >
                            <GroupAddOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                )
            }
        </RoundedPaper>
    )
}
