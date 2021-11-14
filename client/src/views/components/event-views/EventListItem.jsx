import { Typography } from '@mui/material'
import React from 'react'
import RoundedPaper from '../RoundedPaper'

const listPaperItemStyles = {
  backgroundColor: 'primary.main',
  color: '#fff',
  borderRadius:2,
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  padding:3
}

export default function EventListItem(props) {
    const {
        mentor,
        topics,
        scheduledOn
    } = props.data;

    return (
        <RoundedPaper height={50} extraStyles={listPaperItemStyles}>
            <div style={{width:'100%',textAlign:'left'}}>
                <Typography variant='subtitle2'>{mentor}</Typography>
            </div>
            <div style={{width:'100%',textAlign:'left', overflow:'hidden', display:'inline-block', textOverflow:'ellipsis'}}>
                {
                    topics.map((topic, id) => <Typography component='span' key={id} variant='subtitle2'>{topic}, </Typography>)
                }
            </div>
            <div style={{width:'100%',textAlign:'left'}}>
                <Typography variant='subtitle2'>{scheduledOn}</Typography>
            </div>
        </RoundedPaper>
    )
}
