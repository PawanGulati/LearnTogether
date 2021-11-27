import React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function RecipeReviewCard(props) {
  return (
    <Card sx={{ width:'100%' ,height:'100%' }} sx={{border:'1px solid #e0e0e0', boxShadow:0}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`Room ${props.id+1}`}
        subheader={`Mentor ${props.id+1}`}
      />
      <Tooltip title='Topic 1, Topic 2, Topic3'>
        <Typography mt={2} variant="body2" color="text.secondary" sx={{overflow:'hidden'}}>
          Topic 1, Topic2, Topic3
        </Typography>
      </Tooltip>
    </Card>
  );
}
