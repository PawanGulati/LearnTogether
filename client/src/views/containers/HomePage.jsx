import React from 'react'

import StudentHomeRoutes from '../components/StudentHomeRoutes'
import MentorHomeRoutes from '../components/MentorHomeRoutes'
import { Redirect } from 'react-router'

export default function HomePage(props) {
    React.useEffect(() => {
    if(props.current_user['userType'] === 'student')
        props.set_cur_student()
    else
        props.set_cur_mentor()
    }, [])

    
    if(props.current_user['userType'] === 'student') 
        return <StudentHomeRoutes {...props} />
    else 
        return <MentorHomeRoutes {...props} />
  
}
