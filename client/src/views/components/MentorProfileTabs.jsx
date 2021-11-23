import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { set_my_bookings } from '../../utils/services/bookings';
import BookingList from './booking-views/BookingsList';

import withSpinner from '../../hoc/withSpinner/withSpinner'
const BookingListLoaded = withSpinner(BookingList)

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

export default function ProfileTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [events, setEvents] = React.useState(null)

    React.useEffect(()=>{
      let mounted = true
      
      set_my_bookings().then(events => {
        if(mounted) setEvents(events)
      })
      
      return () => mounted = false
    },[])

    return (
        <Box sx={{ width: '100%', height: '100%', overflow:'hidden' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab label="My Bookings" {...a11yProps(0)} />
                <Tab label="Followers" {...a11yProps(1)} />
                <Tab label="Following" {...a11yProps(2)} />
            </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <BookingListLoaded isLoading={events === null} bookings={events} />
            </TabPanel>
            <TabPanel value={value} index={1}>
            Coming Soon...
            </TabPanel>
            <TabPanel value={value} index={2}>
            Coming Soon...
            </TabPanel>
      </Box>
    )
}
