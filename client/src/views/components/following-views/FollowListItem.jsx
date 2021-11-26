import React from 'react'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import RoundedPaper from '../RoundedPaper'

import SocialLinks from '../SocialLinks'

const listPaperItemStyles = {
//   backgroundColor: 'primary.main',
//   color: '#fff',
    borderRadius:2,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    padding:1,
    border: '2px solid var(--primary-blue)',
}

export default function FollowListItem({data}) {

    const {
        name,
        links
    } = data

    return (
        <RoundedPaper height={65} extraStyles={listPaperItemStyles}>
            <Grid container>
                <Grid item xs={6} display='flex' justifyContent='center' alignItems='center'>
                    <Stack width='100%'>
                        <Typography
                            align='center'
                            color='text.disabled'
                            variant='body2'
                        >Student Name</Typography>
                        <Typography
                            sx={{
                                textTransform: 'capitalize',
                                fontWeight:600,
                                color:'text.secondary'
                            }}
                        >
                            {name}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={6} display='flex' justifyContent='center' alignItems='center'>
                <Stack width='100%'>
                    <Typography
                        align='center'
                        color='text.disabled'
                        variant='body2'
                    >Social Links</Typography>
                    <SocialLinks links={links}/>
                </Stack>
                </Grid>
            </Grid>
        </RoundedPaper>
    )
}
