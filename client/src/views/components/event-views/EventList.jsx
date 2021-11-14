import { Box } from '@mui/system'
import React from 'react'
import EventListItem from './EventListItem'

const meetups = [
    {
        mentor: 'Misty Veum',
        topics: ['Arrays', 'Dynamic Programing', 'String'],
        scheduledOn: '12/11/2021'
    },
    {
        mentor: 'Marlene Rodriguez',
        topics: ['Arrays', 'Dynamic Programing', 'String'],
        scheduledOn: '12/11/2021'
    },
    {
        mentor: 'Jeff Jenkins',
        topics: ['Arrays', 'Dynamic Programing', 'String'],
        scheduledOn: '12/11/2021'
    },
    {
        mentor: 'Olivia Cole',
        topics: ['Arrays', 'Dynamic Programing', 'String'],
        scheduledOn: '12/11/2021'
    },
]

export default function EventList() {
    return (
        <>
            {
                meetups.map((meetData, idx)=>
                    <div key={idx}>
                        <EventListItem data={meetData} />
                        {(idx !== meetups.length-1) && <Box my={2}/>}
                    </div>
                )
            }
        </>
    )
}
