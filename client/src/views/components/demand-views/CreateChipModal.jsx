import React from 'react'
import { Button, Modal, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';

import ChipsArray from '../ChipArray';
import moment from 'moment'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterMoment';

import PaperInput from '../PaperInput';

export default function CreateDemandModal({open, handleClose, text, create_async}) {
    const style = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        ...(text === "mentor" ? {width:"56rem"} : {width:"36rem"}),
        height: '25rem',
        borderRadius:'25px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        fontFamily:"Proxima Nova Alt",
        overflow:'auto'
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

    const handleDeleteChip = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

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
                    <Stack spacing={2}>
                        <PaperInput placeholder='Type topic name to add' topic={topic} handleInputChange={handleInputChange} />
                        <Button
                                variant='contained'
                                sx={{
                                    my:2
                                }}
                                onClick={handleAddTopic}
                            >Add Topic</Button>
                        <ChipsArray chipData={chipData} handleDelete={handleDeleteChip} />
                        {
                            text.toLowerCase() === 'event' && 
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <DesktopDatePicker
                                    label="Date desktop"
                                    inputFormat="DD/MM/YYYY"
                                    value={date}
                                    onChange={handleChangeDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        }
                        <Button
                            variant='contained'
                            color='secondary'
                            size='large'
                            sx={{
                                my:4
                            }}
                            onClick={handleCreate}
                        >Create {text} </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}
