import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { create_demand } from '../../../utils/services/demands';
import ChipsArray from '../ChipArray';

import PaperInput from '../PaperInput';

export default function CreateDemandModal({open, handleClose, text}) {
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

    const handleCreateDemand = () =>{
        if(chipData.length > 0){
            const topics = chipData.reduce((acc, chip)=>{
                acc.push(chip.label)
                return acc
            }, [])

            const data = {topics}
            console.log(data);
            create_demand(data)
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
                   <PaperInput placeholder='Type topic name to add' topic={topic} handleInputChange={handleInputChange} />
                   <Button
                        variant='contained'
                        sx={{
                            my:2
                        }}
                        onClick={handleAddTopic}
                    >Add Topic</Button>
                   <ChipsArray chipData={chipData} handleDelete={handleDeleteChip} />
                   <Button
                        variant='contained'
                        color='secondary'
                        size='large'
                        sx={{
                            my:4
                        }}
                        onClick={handleCreateDemand}
                    >Create Demand </Button>
                </Box>
            </Modal>
        </div>
    )
}
