import { Box } from '@mui/system'
import React from 'react'
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
        <>
            <Box style={{height:'100%', width:'100%', maxHeight:'100%', overflow:'auto'}} >
                {
                    props.demands.map((demand, idx)=>
                        <div key={idx}>
                            <DemandListItem 
                                data={demand} 
                                options={props.options} 
                                handleOpenJoinPropmt={props.handleOpenJoinPropmt}
                            />
                            {(idx !== props.demands.length-1) && <Box my={2}/>}
                        </div>
                    )
                }
            </Box>
        </>
    )
}
