import { IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import RoundedPaper from '../RoundedPaper'

import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';

import moment from 'moment'

const listPaperItemStyles = {
//   backgroundColor: 'primary.main',
//   color: '#fff',
  borderRadius:2,
  flexDirection:'row',
  justifyContent:'space-evenly',
  alignItems:'center',
  padding:3,
  border: '2px solid var(--primary-blue)'
}

export default function DemandListItem({data, ...xtra}) {
    const {
        topics,
        createdOn
    } = data;

    return (
        <RoundedPaper height={50} extraStyles={listPaperItemStyles}>
            <div style={{width:'100%', overflow:'hidden', display:'inline-block', textOverflow:'ellipsis'}}>
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
            </div>
            <div style={{width:'100%'}}>
                <Typography variant='subtitle2'>{moment(createdOn).format('DD/MM/YYYY')}</Typography>
            </div>
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
