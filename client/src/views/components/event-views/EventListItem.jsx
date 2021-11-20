import { Typography } from '@mui/material'
import React from 'react'
import RoundedPaper from '../RoundedPaper'

const listPaperItemStyles = {
  backgroundColor: 'primary.main',
  color: '#fff',
  borderRadius:2,
  flexDirection:'row',
  justifyContent:'space-evenly',
  alignItems:'center',
  padding:3
}

export default function EventListItem(props) {
    const {
        students,
        topics,
        bookings
    } = props.data;

    return (
        <RoundedPaper height={50} extraStyles={listPaperItemStyles}>
            <div style={{width:'100%'}}>
                <Typography variant='subtitle2'>{students.length} Students</Typography>
            </div>
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
                            {topic}, 
                        </Typography>
                    )
                }
            </div>
            <div style={{width:'100%'}}>
                <Typography variant='subtitle2'>{bookings.length} Bookings</Typography>
            </div>
        </RoundedPaper>
    )
}
