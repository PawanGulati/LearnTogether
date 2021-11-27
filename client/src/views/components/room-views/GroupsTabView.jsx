import React from 'react'

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import GroupCard from './GroupCard'

export default function GroupsTabView() {
    return (
        <Grid container direction='column' height='100%'>
            <Grid item xs={1} sx={{borderBottom:'1px solid #e0e0e0'}}>
                <Typography
                    variant='h5'
                    align='left'
                    p={2}
                    color='text.secondary'
                >
                    Rooms List
                </Typography>
            </Grid>
            <Grid item p={2} xs={10} overflow='auto'>
                <Grid container spacing={1} height='100%'>
                    {
                        [...Array(7)].map((_,id) => 
                            <Grid item xs={6} key={id} sx={{overflow:'auto'}}>
                                <GroupCard id={id}/>
                            </Grid>
                        )
                    }
                </Grid>                
            </Grid>
        </Grid>
    )
}
