import React from 'react'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import MessageListItem from './MessageListItem';

export default function MessageList() {
    return (
        <List sx={{
            overflowY: 'auto'
        }}>
            {
                [...Array(3)].map((msg, id)=> 
                    <ListItem key="1">
                        <MessageListItem id={id}/>
                    </ListItem>
                )
            }
        </List>
    )
}
