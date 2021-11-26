import React from 'react'
import moment from 'moment'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'

import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterMoment';
import AddBoxIcon from '@mui/icons-material/AddBox';

import ChipsArray from './ChipArray';
import PaperInput from '../PaperInput';

export default function CreateChipModal({open, handleClose, text, create_async}) {
    const style = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        ...(text === "mentor" ? {width:"56rem"} : {width:"36rem"}),
        height: '25rem',
        borderRadius:'25px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        fontFamily:"Proxima Nova Alt",
        overflow:'auto',
    };
    
    const [date, setDate] = React.useState(new Date());

    const handleChangeDate = (newValue) => {
        setDate(newValue);
    };

    const [topic, setTopic] = React.useState('')
    const [chipData, setChipData] = React.useState([]);
    
    const handleInputChange = ({target: {value}}) => {
        setTopic(value)
    }

    // add topic chips
    const handleAddTopic = () => {
        let len = chipData.length
        
        if(topic !== undefined && topic !== null && topic !== ''){
            setChipData([
                ...chipData,
                {
                    key: len,
                    label: topic.slice(0,25)
                }
            ])
            setTopic('')
        }
    }

    // delete topic chip
    const handleDeleteChip = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    // submit handler
    const handleCreate = () =>{
        if(chipData.length > 0){
            const topics = chipData.reduce((acc, chip)=>{
                acc.push(chip.label)
                return acc
            }, [])

            const data = {topics, date: moment(date).format('MM/DD/YYYY')}
            create_async(data)
        }
        setChipData([])
        handleClose()
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack spacing={2} width={'100%'} height={'100%'} display='flex'>
                        <Stack direction='row' spacing={1}>
                            <PaperInput placeholder='Type topic name to add' topic={topic} handleInputChange={handleInputChange} />
                            <IconButton onClick={handleAddTopic}>
                                <AddBoxIcon color='primary' fontSize='large' sx={{transform: 'scale(2)'}}/>
                            </IconButton>
                        </Stack>
                        <ChipsArray chipData={chipData} handleDelete={handleDeleteChip} />
                        {
                            text.toLowerCase() === 'event' && 
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <DesktopDatePicker
                                    label="Schedule Date"
                                    inputFormat="DD/MM/YYYY"
                                    value={date}
                                    onChange={handleChangeDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        }
                        <Box 
                            sx={{
                                my:4,
                                flexGrow: 1,
                                alignItems: 'flex-end',
                                display: 'flex'
                            }}
                        >
                            <Button
                                variant='contained'
                                color='secondary'
                                size='large'
                                fullWidth   
                                onClick={handleCreate}
                            >Create {text} </Button>
                        </Box>
                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}
