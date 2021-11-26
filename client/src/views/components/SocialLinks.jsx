import React from 'react'

import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Social_Links({links}) {
    return (
        <Stack direction='row' spacing={3} mt={1} justifyContent='center'>
            <Link href={`https://${links.linkedin}`} target='_blank'>
                <LinkedInIcon sx={{color:'var(--linkedin)'}}/>
            </Link>
            <Link href={`https://${links.twitter}`} target='_blank'>
                <TwitterIcon sx={{color:'var(--twitter)'}}/>
            </Link>
            <Link href={`https://${links.github}`} target='_blank'>
                <GitHubIcon sx={{color:'#000'}}/>
            </Link>
            <Link href={`https://${links.facebook}`} target='_blank'>
                <FacebookIcon />
            </Link>
        </Stack>
    )
}
