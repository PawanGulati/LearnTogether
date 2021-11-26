import React from 'react'
import moment from 'moment'

import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import RoundedPaper from '../RoundedPaper'

import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';

const listPaperItemStyles = {
//   backgroundColor: 'primary.main',
//   color: '#fff',
  borderRadius:2,
  flexDirection:'row',
  justifyContent:'space-evenly',
  alignItems:'center',
  padding:1,
  border: '2px solid var(--primary-blue-blur)',
  boxShadow:0
}

export default function DemandListItem({data, ...xtra}) {
    const {
        topics,
        createdOn
    } = data;

    return (
        <RoundedPaper height={65} extraStyles={listPaperItemStyles}>
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
            <Stack style={{width:'100%'}}>
                <Typography
                    align='center'
                    color='text.disabled'
                    variant='body2'
                >Created At</Typography>
                <Typography variant='subtitle2'>{moment(createdOn).format('DD/MM/YYYY')}</Typography>
            </Stack>
            {
                xtra.options && (
                    <Tooltip title='Convert Event' >
                        <IconButton onClick={()=>xtra.handleOpenJoinPropmt(data, false)}>
                            <CachedOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                )
            }
        </RoundedPaper>
    )
}
