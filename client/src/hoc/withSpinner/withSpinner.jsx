import React from 'react'

import GridLoader from 'react-spinners/GridLoader'
import {css} from '@emotion/react'
import { Box } from '@mui/system'

const wrapper = WrapperComponent => ({isLoading, ...props}) =>{
    const override = css`
        position:absolute;
        top:50%;
        left:45%;
        display:flex;
    `

    return isLoading ?
        <Box
            component="main"
            display="flex"
            sx={{
            backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100%',
            position: 'relative'
        }}
        >
            <GridLoader size={35} color={'var(--primary-blue)'} css={override} /> 
        </Box> :
        <WrapperComponent {...props} />
}

export default wrapper