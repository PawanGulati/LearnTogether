import React from 'react'

import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

import DemandListItem from './DemandListItem'

// const demands = [
//     {
//         topics: ['Arrays', 'Dynamic Programing', 'String'],
//         createdOn: '12/11/2021'
//     },
//     {
//         topics: ['Arrays', 'Dynamic Programing', 'String'],
//         createdOn: '12/11/2021'
//     },
//     {
//         topics: ['Arrays', 'Dynamic Programing', 'String'],
//         createdOn: '12/11/2021'
//     },
//     {
//         topics: ['Arrays', 'Dynamic Programing', 'String'],
//         createdOn: '12/11/2021'
//     },
// ]

export default function DemandList(props) {
    return (
        <Stack sx={{overflow: 'auto', height: '100%'}} >
            {
                props.demands.map((demand, idx)=>
                    <div key={idx} style={{marginRight:10}}>
                        <DemandListItem 
                            data={demand} 
                            options={props.options} 
                            handleOpenJoinPropmt={props.handleOpenJoinPropmt}
                        />
                        {(idx !== props.demands.length-1) && <Box my={2}/>}
                    </div>
                )
            }
        </Stack>
    )
}
