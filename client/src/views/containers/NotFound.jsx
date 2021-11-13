import { Button, Typography } from '@mui/material'
import React from 'react'
import {makeStyles} from '@mui/styles'

import {ReactComponent as NotFoundIMG} from '../../constants/images/404.svg'

const useStyles = makeStyles(theme=>({
    root:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    image:{
        height:'45rem',
        width:'100%'
    },
    textPane:{
        display:'flex',
        textAlign:'left',
        alignItems:'center',
        flexDirection:'column',
        height:'100%',
        width:'70%',
        position:'relative'
    },
    headlineTypo:{
        width:'25rem',
        fontWeight:900,
        fontSize:'4.3rem',
        margin:'1rem'
    },
    paraTypo:{  
        width:'25rem',
        height:'100%',
    },
    button:{
        borderRadius:10,
        margin:'4rem 0',
        marginRight:'43%',
    }
}))

export default function NotFound({history}) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.textPane}>
                <Typography variant='h2' className={classes.headlineTypo}>I have bad news for you</Typography>
                <Typography variant='h6' className={classes.paraTypo}>The page you are looking for might be removed or is temporarily unavailable</Typography>
                <Button size='large' className={classes.button} variant='contained' color='primary' onClick={()=>{history.push('/')}}>Come Home</Button>
            </div>
            <NotFoundIMG className={classes.image} />
        </div>
    )
}
