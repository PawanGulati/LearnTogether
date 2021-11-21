import { Box } from '@mui/system'
import React from 'react'
import EventListItem from './EventListItem'

// const meetups = [
//     {
//         mentor: 'Misty Veum',
//         topics: ['Arrays', 'Dynamic Programing', 'String'],
//         scheduledOn: '12/11/2021'
//     },
//     {
//         mentor: 'Marlene Rodriguez',
//         topics: ['Arrays', 'Dynamic Programing', 'String'],
//         scheduledOn: '12/11/2021'
//     },
//     {
//         mentor: 'Jeff Jenkins',
//         topics: ['Arrays', 'Dynamic Programing', 'String'],
//         scheduledOn: '12/11/2021'
//     },
//     {
//         mentor: 'Olivia Cole',
//         topics: ['Arrays', 'Dynamic Programing', 'String'],
//         scheduledOn: '12/11/2021'
//     },
// ]

export default function EventList(props) {
    return (
        <>
            <Box style={{height:'100%', width:'100%', maxHeight:'100%', overflow:'auto'}}>
                {
                    props.events.map((event, idx)=>{
                        if(event.bookings.length === 0 && !props.checked)
                            return(
                                <div key={idx}>
                                    <EventListItem 
                                        data={event} 
                                        options={props.options}
                                        handleOpenJoinPropmt={props.handleOpenJoinPropmt}
                                    />
                                    {(idx !== props.events.length-1) && <Box my={2}/>}
                                </div>
                            )
                        else if(event.bookings.length > 0 && props.checked){
                            return event.bookings.map((b, id) => 
                                <div key={id+idx+1}>
                                    <EventListItem 
                                        data={event} 
                                        mentor={b['mentor']} 
                                        date={b['scheduleOn']}
                                        options={props.options}
                                        handleOpenJoinPropmt={props.handleOpenJoinPropmt}
                                    />
                                    {(idx !== props.events.length-1) && <Box my={2}/>}
                                </div>
                            )
                        }
                    })
                }
            </Box>
        </>
    )
}
