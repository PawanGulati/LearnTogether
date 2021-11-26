import React from 'react'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EventList from '../event-views/EventList';
import DemandList from '../demand-views/DemandList';
import FollowList from '../following-views/FollowList';

import withSpinner from '../../../hoc/withSpinner/withSpinner'
import { set_past_events } from '../../../utils/services/events'
import { set_my_demands } from '../../../utils/services/demands';
import { set_student_following } from '../../../utils/services/follow';

const EventListLoaded = withSpinner(EventList)
const DemandListLoaded = withSpinner(DemandList)
const FollowListLoaded = withSpinner(FollowList)

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function StudentProfileTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [events, setEvents] = React.useState(null)
    const [demands, setDemands] = React.useState(null)
    const [following, setFollowing] = React.useState(null)

    React.useEffect(()=>{
      let mounted = true
      
      set_past_events().then(events => {
        if(mounted) setEvents(events)
      })
      
      return () => mounted = false
    },[])

    React.useEffect(()=>{
    let mounted = true
    
    set_my_demands().then(demands => {
        if(mounted) setDemands(demands)
    })
    
    return () => mounted = false
    },[])

    React.useEffect(()=>{
      let mounted = true
      
      set_student_following(props.user._id).then(following => {
          if(mounted) setFollowing(following)
      })
      
      return () => mounted = false
    },[])

    return (
        <Box sx={{ width: '100%', height: '100%', overflow:'hidden'}} pb={4}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab label="My Events" {...a11yProps(0)} />
                <Tab label="My Requests" {...a11yProps(1)} />
                <Tab label="Following" {...a11yProps(2)} />
            </Tabs>
            </Box>
            <TabPanel value={value} index={0} style={{height:'100%', overflowY: 'auto'}}>
              <EventListLoaded 
                isLoading={events === null} 
                events={events} 
                options={false} 
                checked={true}
            />
            </TabPanel>
            <TabPanel value={value} index={1} style={{height:'100%', overflowY: 'auto'}}>
                <DemandListLoaded 
                    isLoading={demands === null} 
                    demands={demands} 
                    options={false} 
                    checked={false}
                />
            </TabPanel>
            <TabPanel value={value} index={2} style={{height:'100%', overflowY: 'auto'}}>
              <FollowListLoaded 
                isLoading={following === null}
                follow = {following}
              />
            </TabPanel>
      </Box>
    )
}
