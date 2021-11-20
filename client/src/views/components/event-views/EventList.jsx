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
                    props.events.map((meetData, idx)=>
                        <div key={idx}>
                            <EventListItem data={meetData} />
                            {(idx !== props.events.length-1) && <Box my={2}/>}
                        </div>
                    )
                }
            </Box>
        </>
    )
}
