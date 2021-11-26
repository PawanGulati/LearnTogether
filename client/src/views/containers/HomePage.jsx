import React from 'react'

import MentorHomeRoutes from '../components/mentor-views/MentorHomeRoutes'
import StudentHomeRoutes from '../components/student-views/StudentHomeRoutes'

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
