import React from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import StudentSignup from './StudentSignup';
import MentorSignup from './MentorSignup';

export default function SignupModal({open, handleClose, text, ...otherProps}) {
    const style = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        ...(text === "mentor" ? {width:"56rem"} : {width:"36rem"}),
        height: '40rem',
        borderRadius:'25px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        fontFamily:"Proxima Nova Alt"
    };
   
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <Typography variant='h4'><i>Join me as</i></Typography>
                        <Typography 
                            variant='h3' 
                            fontSize='23px' 
                            style={{textTransform: 'uppercase', letterSpacing:'1px', fontWeight:900, fontSize:'42px', color:"var(--theme-red-blur)"}} 
                            mx={3}>
                                {text}
                        </Typography>
                    </Box>
                    {
                        text === "student" ? <StudentSignup {...otherProps} /> : <MentorSignup {...otherProps} />
                    }
                </Box>
            </Modal>
        </div>
    )
}
