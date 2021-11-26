import React from 'react'

import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

import FollowListItem from './FollowListItem'

export default function FollowList(props) {
    return (
        <Stack sx={{overflow: 'auto', height: '100%'}} >
            {
                props.follow.map((user, idx)=>
                    <div key={idx} style={{marginRight: '12px'}}>
                        <FollowListItem
                            data={user} 
                        />
                        {(idx !== props.follow.length-1) && <Box my={2}/>}
                    </div>
                )
            }
        </Stack>
    )
}
