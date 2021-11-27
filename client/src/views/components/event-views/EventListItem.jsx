import React from 'react'
import moment from 'moment'

import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';

import RoundedPaper from '../RoundedPaper'

const listPaperItemStyles = {
//   backgroundColor: 'primary.main',
//   color: '#fff',
  borderRadius:2,
  flexDirection:'row',
  justifyContent:'space-evenly',
  alignItems:'center',
  padding:1,
  border: '2px solid var(--primary-blue-blur)',
  boxShadow:0,
}

export default function EventListItem({data, ...xtra}) {
    const {
        students,
        topics,
        bookings
    } = data;

    return (
        <RoundedPaper height={65} extraStyles={listPaperItemStyles}>
            <Stack direction='row' spacing={4} width={'100%'} alignItems='center'>
                    <Stack style={{width:'100%'}}>
                        <Typography
                            align='center'
                            color='text.disabled'
                            variant='body2'
                        >Members</Typography>
                        <Typography variant='subtitle2'>{students.length} Students</Typography>
                    </Stack>
                    <Stack 
                        sx={{
                            width:'100%', 
                            height:'100%',
                            overflow:'hidden', 
                            display:'inline-block', 
                            textOverflow:'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <Typography
                            align='center'
                            color='text.disabled'
                            variant='body2'
                        >Topics</Typography>
                        <Tooltip title={topics.reduce((acc, val)=>{acc +=(val+', '); return acc}, "")}>
                            <Box>
                                {
                                topics.map((topic, id) => 
                                        <Typography 
                                            component='span' 
                                            key={id} 
                                            variant='subtitle2'
                                            mr={1}
                                            sx={{
                                                textTransform: 'capitalize',
                                                fontWeight:600,
                                                color:'text.secondary'
                                            }}
                                        >
                                            {topic + (id === topics.length-1 ? '':',')} 
                                        </Typography>
                                    )
                                }
                            </Box>
                        </Tooltip>
                    </Stack>
                    {
                        bookings.length > 0 && (
                            <>
                                <Stack style={{width:'100%'}}>
                                    <Typography
                                        align='center'
                                        color='text.disabled'
                                        variant='body2'
                                    >Booked By</Typography>
                                    <Typography variant='subtitle2'>{xtra.mentor}</Typography>
                                </Stack>
                                <Stack style={{width:'100%'}}>
                                    <Typography
                                        align='center'
                                        color='text.disabled'
                                        variant='body2'
                                    >Scheduled On</Typography>
                                    <Typography variant='subtitle2'>{moment(xtra.date).format('DD/MM/YYYY')}</Typography>
                                </Stack>
                            </>
                        )
                    }
                    {
                        xtra.options && (
                            <Tooltip title='Join Event'>
                                <IconButton onClick={()=>xtra.handleOpenJoinPropmt(data, true)} >
                                    <GroupAddOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        )
                    }
            </Stack>
        </RoundedPaper>
    )
}
