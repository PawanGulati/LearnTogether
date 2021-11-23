import { Box } from '@mui/system'
import React from 'react'
import BookingListItem from './BookingListItem'

export default function BookingList(props) {
    return (
        <Box style={{height:'100%', width:'100%', maxHeight:'100%', overflow:'auto'}}>
            {
                props.bookings.map((booking, idx)=>{
                    return(
                        <div key={idx}>
                            <BookingListItem 
                                data={booking} 
                                options={props.options}
                            />
                            {(idx !== props.bookings.length-1) && <Box my={2}/>}
                        </div>
                    )
                })
            }
        </Box>
    )
}
