import React from 'react'

import Box from '@mui/material/Box'

import BookingListItem from './BookingListItem'

export default function BookingList(props) {
    return (
        <Box style={{height:'100%', width:'100%', overflow:'auto'}}>
            {
                props.bookings.map((booking, idx)=>{
                    return(
                        <Box key={idx}>
                            <BookingListItem 
                                data={booking} 
                                options={props.options}
                                // handleOpenPropmt={props.handleOpenPropmt}
                            />
                            {(idx !== props.bookings.length-1) && <Box my={2}/>}
                        </Box>
                    )
                })
            }
        </Box>
    )
}
